using FCSAmerica.CentralCodes;
using FCSAmerica.Common.Library.RestServiceHelper;
using FCSAmerica.EnterpriseConfigurationStore;
using FCSAmerica.ServiceFabric.Common;
using FCSAmerica.ServiceFabric.Common.Authentication;
using FCSAmerica.ServiceFabric.Web.Middleware;
using FCSAmerica.Transact.Client.Api.Helpers;
using FCSAmerica.Transact.Client.Api.Utilities;
using FCSAmerica.Transact.ClientCommon;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.Common.Helpers;
using FCSAmerica.Transact.ServiceAgents;
using FCSAmerica.Transact.ServiceAgentsFacade;
using Microsoft.Practices.Unity;
using System;
using System.Configuration;
using System.Security.Claims;
using System.Security.Principal;
using System.Web.Http;
using Unity.WebApi;

namespace FCSAmerica.Transact.Client.Api
{
    public static class UnityConfig
    {
        public static void RegisterComponents(HttpConfiguration config)
        {
            var container = GetContainer();

            config.DependencyResolver = new UnityDependencyResolver(container);
        }

        public static IUnityContainer GetContainer()
        {
            var container = new UnityContainer();
            var applicationName = ConfigurationManager.AppSettings["ApplicationName"];
            var enterpriseLoggerTraceSourceName = ConfigurationManager.AppSettings["EnterpriseLoggingTraceSourceName"];

            container.RegisterType<ISecurityContext, SecurityContext>(
                    new InjectionFactory(c =>
                    {
                        return SecurityCallContext.Current;
                    }))
                .RegisterType<ILogUtility, LogUtility>(
                    new InjectionFactory
                    (c =>
                    {
                        try
                        {
                            var contextInfo = new LogContextInfo()
                            {
                                AuditInfoRequestId = SecurityCallContext.Current.AuditInfo.RequestId,
                                AuditInfoSessionId = SecurityCallContext.Current.AuditInfo.SessionId,
                                LogAsUser = SecurityCallContext.Current.AuditInfo.EmailAddress,
                                PartnerName = SecurityCallContext.Current.AuditInfo.PartnerName,
                                ThrowOnLoggingError = true,
                                TraceSourceName = enterpriseLoggerTraceSourceName
                            };
                            return new LogUtility(contextInfo);
                        }
                        catch (Exception ex)
                        {
                            var contextInfo = new LogContextInfo()
                            {
                                AuditInfoRequestId = "test",
                                AuditInfoSessionId = 0,
                                LogAsUser = "safeusernoreply@fcsamerica.com",
                                PartnerName = "FCSA",
                                ThrowOnLoggingError = true,
                                TraceSourceName = enterpriseLoggerTraceSourceName
                            };
                            var logUtility = new LogUtility(contextInfo);
                            logUtility.Error($"Error creating logger: {ex}");
                            return logUtility;
                        }
                    })
                )
                .RegisterType<IClientRestServiceHelperFactory, ClientClientRestServiceHelperFactory>()
                .RegisterType<IRestServiceHelperFactory, RestServiceHelperFactory>()
                .RegisterType<IEcsSettings, EcsSettings>(new InjectionFactory(c =>
                {
                    var partnerName = SecurityCallContext.Current?.AuditInfo?.PartnerName;
                    var poco = EnterpriseConfigurationManager.GetConfigurationPoco<EcsSettings>(applicationName,
                        partnerName);
                    return poco;
                }))
                .RegisterType<IHealthCheckUtility, HealthCheckUtility>()
                .RegisterType<ICoreAchServiceAgent, ServiceAgent>()
                .RegisterType<ICoreBankTemplateServiceAgent, ServiceAgent>()
                .RegisterType<ICoreCodesServiceAgent, ServiceAgent>()
                .RegisterType<ICoreBankServiceAgent, ServiceAgent>()
                .RegisterType<ICoreAccountsServiceAgent, ServiceAgent>()
                .RegisterType<ICoreDraftServiceAgent, ServiceAgent>()
                .RegisterType<ICoreFeesServiceAgent, ServiceAgent>()
                .RegisterType<ICoreProcessingDatesServiceAgent, ServiceAgent>()
                .RegisterType<ICoreInternalTransferServiceAgent, ServiceAgent>()
                .RegisterType<ICentralCodesServiceAgent, ServiceAgent>()
                .RegisterType<ICoreCodesServiceAgentsFacade, CoreCodesServiceAgentsFacade>()
                .RegisterType<ICorePaymentServiceAgentsFacade, CorePaymentServiceAgentsFacade>()
                .RegisterType<ICoreAchServiceAgentsFacade, CoreAchServiceAgentsFacade>()
                .RegisterType<ICoreAccountsServiceAgentsFacade, CoreAccountsServiceAgentsFacade>()
                .RegisterType<ICoreDraftServiceAgentsFacade, CoreDraftServiceAgentsFacade>()
                .RegisterType<IEnumHelper, EnumHelper>()
                .RegisterType<ICoreInternalTransferServiceAgentsFacade, CoreInternalTransferServiceAgentFacade>()
                .RegisterType<ICoreProcessingDatesServiceAgentsFacade, CoreProcessingDatesServiceAgentsFacade>()
                .RegisterType<ICoreFeeServiceAgentsFacade, CoreFeeServiceAgentsFacade>()
                .RegisterType<ICoreWiresServiceAgentFacade, CoreWiresServiceAgentFacade>()
                .RegisterType<ICoreWiresServiceAgent, ServiceAgent>()
                .RegisterType<IElasticSearchServiceAgent, ServiceAgent>();

            container.RegisterType<ICodesManager, FCSAmerica.Transact.Client.Models.CentralCodesManager>(new InjectionFactory(
                c =>
                {
                    var ecsPoco = container.Resolve<IEcsSettings>();

                    return new CentralCodesServiceAgent(ecsPoco.CentralCodesApi);
                }));

            return container;
        }

        public static IUnityContainer GetStartupContainer()
        {
            var container = new UnityContainer();
            var applicationName = ConfigurationManager.AppSettings["ApplicationName"];
            var enterpriseLoggerTraceSourceName = ConfigurationManager.AppSettings["EnterpriseLoggingTraceSourceName"];

            var mcGruffSecurityContext = McGruff.TokenGenerator.SecurityContext.GetInstance(applicationName, "FCSA");
            var identity = WindowsIdentity.GetCurrent();
            var principal = new ClaimsPrincipal(identity);
            var claimsMapperInfo = new ClaimsMapperInfo(ConfigurationManager.AppSettings["ServiceFabricHost"],
                            ConfigurationManager.AppSettings["SigningCertificate"],
                            ConfigurationManager.AppSettings["IssuerName"],
                            ConfigurationManager.AppSettings["ClaimsMapperUri"],
                            applicationName,
                            ConfigurationManager.AppSettings["RelyingParty"]);

            var securityContext = new SecurityContext(new ContextInfo(principal, mcGruffSecurityContext.ServiceToken,
            mcGruffSecurityContext.AuditInfo, claimsMapperInfo, new Uri($"https://{ConfigurationManager.AppSettings["ServiceFabricHost"]}/")));

            container.RegisterType<ISecurityContext, SecurityContext>(
                    new InjectionFactory(c => securityContext))
                .RegisterType<ILogUtility, LogUtility>(
                    new InjectionFactory(c =>
                        {

                            var contextInfo = new LogContextInfo()
                            {
                                AuditInfoRequestId = securityContext.AuditInfo.RequestId,
                                AuditInfoSessionId = securityContext.AuditInfo.SessionId,
                                LogAsUser = securityContext.AuditInfo.EmailAddress,
                                PartnerName = securityContext.AuditInfo.PartnerName,
                                ThrowOnLoggingError = true,
                                TraceSourceName = enterpriseLoggerTraceSourceName
                            };
                            return new LogUtility(contextInfo);
                        }
                    ))
                .RegisterType<IClientRestServiceHelperFactory, ClientClientRestServiceHelperFactory>()
                .RegisterType<IRestServiceHelperFactory, RestServiceHelperFactory>()
                .RegisterType<IEcsSettings, EcsSettings>(new InjectionFactory(c =>
                {
                    var partnerName = securityContext.AuditInfo?.PartnerName;
                    var poco = EnterpriseConfigurationManager.GetConfigurationPoco<EcsSettings>(applicationName,
                        partnerName);
                    return poco;
                }))
                .RegisterType<IHealthCheckUtility, HealthCheckUtility>()
                .RegisterType<IElasticSearchServiceAgent, ServiceAgent>()
                .RegisterType<ICoreAchServiceAgent, ServiceAgent>()
                .RegisterType<ICoreBankTemplateServiceAgent, ServiceAgent>()
                .RegisterType<ICoreCodesServiceAgent, ServiceAgent>()
                .RegisterType<ICoreBankServiceAgent, ServiceAgent>()
                .RegisterType<ICoreAccountsServiceAgent, ServiceAgent>()
                .RegisterType<ICoreDraftServiceAgent, ServiceAgent>()
                .RegisterType<ICoreFeesServiceAgent, ServiceAgent>()
                .RegisterType<ICoreProcessingDatesServiceAgent, ServiceAgent>()
                .RegisterType<ICoreInternalTransferServiceAgent, ServiceAgent>()
                .RegisterType<ICentralCodesServiceAgent, ServiceAgent>()
                .RegisterType<ICoreCodesServiceAgentsFacade, CoreCodesServiceAgentsFacade>()
                .RegisterType<ICoreAchServiceAgentsFacade, CoreAchServiceAgentsFacade>()
                .RegisterType<ICoreAccountsServiceAgentsFacade, CoreAccountsServiceAgentsFacade>()
                .RegisterType<ICoreDraftServiceAgentsFacade, CoreDraftServiceAgentsFacade>()
                .RegisterType<IEnumHelper, EnumHelper>()
                .RegisterType<ICoreInternalTransferServiceAgentsFacade, CoreInternalTransferServiceAgentFacade>()
                .RegisterType<ICoreProcessingDatesServiceAgentsFacade, CoreProcessingDatesServiceAgentsFacade>()
                .RegisterType<ICoreWiresServiceAgentFacade, CoreWiresServiceAgentFacade>()
                .RegisterType<ICoreWiresServiceAgent, ServiceAgent>()
                .RegisterType<ICoreFeeServiceAgentsFacade, CoreFeeServiceAgentsFacade>();
            container
                .RegisterType<ICodesManager, FCSAmerica.Transact.Client.Models.CentralCodesManager>(new InjectionFactory(
                c =>
                {
                    var ecsPoco = container.Resolve<IEcsSettings>();

                    return new CentralCodesServiceAgent(ecsPoco.CentralCodesApi);
                }));

            return container;
        }
    }
}