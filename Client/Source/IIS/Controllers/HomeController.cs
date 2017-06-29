using FCSAmerica.EnterpriseMessaging.Common.Enums;
using FCSAmerica.EnterpriseMessaging.Common.Objects;
using FCSAmerica.McGruff.Core;
using FCSAmerica.Transact.WebUI.Common;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Mvc;

namespace FCSAmerica.Transact.WebUI.Controllers
{
    [System.Web.Mvc.Authorize]
    public class HomeController : Controller
    {
        private ISecurityContext _securityContext;
        private ILogUtility _logUtility;
        private IMessageUtility _messageUtility;
        private IEcsSettings _ecsSettings;

        public HomeController(ISecurityContext securityContext, ILogUtility logUtility, IMessageUtility messageUtility, IEcsSettings ecsSettings)
        {
            _securityContext = securityContext;
            _logUtility = logUtility;
            _messageUtility = messageUtility;
            _ecsSettings = ecsSettings;
        }


        // GET: Home
        public ActionResult Index()
        {
            ViewBag.AuthToken = _securityContext.UserToken.ToString();
            ViewBag.AuditInfoToken = _securityContext.AuditInfo.ToString();
            ViewBag.LoggedOnUserName = $"{_securityContext.AuditInfo.FirstName} {_securityContext.AuditInfo.LastName}";
            ViewBag.UserImageUrl = _securityContext.AuditInfo.ImageUrl;
            ViewBag.ServiceFabricApi = _ecsSettings.ServiceFabricApi;
            return View();
        }

        [System.Web.Mvc.HttpPost]
        [ValidateInput(false)]
        [System.Web.Mvc.Route("Home/LogError")]
        public void LogError()
        {
            var message = Request["message"];

            if (!string.IsNullOrEmpty(message))
            {
                _logUtility.Error($"Web.Client JavaScript Error.\n\nUser: {_securityContext.AuditInfo.EmailAddress}\n{Server.UrlDecode(message)}");
            }
        }

        [System.Web.Mvc.HttpGet]
        [ValidateInput(false)]
        [System.Web.Mvc.Route("Home/pingError")]
        public void PingError()
        {
            _logUtility.Info("Ping Error Successfull");
        }

        [System.Web.Mvc.HttpGet]
        [ValidateInput(false)]
        [System.Web.Mvc.Route("Home/enterpriseMessagingTest")]
        public void EnterpriseMessagingTest(string emailTo)
        {

            var testEmail = new Mail
            {
                From = "noreply@fcsamerica.com",
                Recipients = new List<string>() { emailTo },
                Message = "Hello, you have received a test email",
                Cc = new List<string>(),
                Bcc = new List<string>(),
                Priority = Priority.Medium,
                SystemName = ConfigurationManager.AppSettings["SystemName"],
                Subject = "Test Email from Transact WebUI!!",
            };
            _messageUtility.SendMail(testEmail);
        }

        [System.Web.Mvc.Route("Home/ecs/configuration")]
        public JsonResult GetEnterpriseConfiguration()
        {
            return Json(_ecsSettings, JsonRequestBehavior.AllowGet);
        }
    }
}