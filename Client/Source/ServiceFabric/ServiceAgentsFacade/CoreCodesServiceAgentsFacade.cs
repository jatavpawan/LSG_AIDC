using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.ServiceAgents;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public class CoreCodesServiceAgentsFacade : ICoreCodesServiceAgentsFacade
    {
        private readonly ICoreCodesServiceAgent _coreCodesServiceAgent;
        private readonly ICentralCodesServiceAgent _centralCodesServiceAgent;

        public CoreCodesServiceAgentsFacade(ICoreCodesServiceAgent coreCodesServiceAgent, ICentralCodesServiceAgent centralCodesServiceAgent)
        {
            _coreCodesServiceAgent = coreCodesServiceAgent;
            _centralCodesServiceAgent = centralCodesServiceAgent;
        }

        public List<GenericEnumMap> GetBankAccountTypes()
        {
            return _coreCodesServiceAgent.GetBankAccountTypes();
        }

        public List<Office> GetOffices()
        {
            return _coreCodesServiceAgent.GetOffices();
        }

        public List<GenericEnumMap> GetOfficesBySearchString(string searchString)
        {
            return _coreCodesServiceAgent.GetOfficesForDropDown(searchString);
        }

        public List<GenericEnumMap> GetHowToApplyList()
        {
            return _coreCodesServiceAgent.GetHowToApplyList();
        }

        public List<GenericEnumMap> GetOtherFees()
        {
            return _coreCodesServiceAgent.GetOtherFees();
        }

        public List<GenericEnumMap> GetAchInRejectionReasonCodes()
        {
            return _coreCodesServiceAgent.GetAchInRejectReasonCodes();
        }
        public List<GenericEnumMap> GetAchOutRejectionReasonCodes()
        {
            return _coreCodesServiceAgent.GetAchOutRejectReasonCodes();
        }
        public List<GenericEnumMap> GetAchOlderThan24HoursRejectReasonCodes()
        {
            return _coreCodesServiceAgent.GetAchOlderThan24HoursRejectReasonCodes();
        }

        public List<GenericEnumMap> GetDraftRejectionReasonCodes()
        {
            return _coreCodesServiceAgent.GetDraftRejectReasonCodes();
        }

        public List<Holiday> GetHolidays()
        {
            return _centralCodesServiceAgent.GetHolidays();
        }
    }
}
