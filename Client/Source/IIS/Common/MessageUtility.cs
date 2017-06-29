using FCSAmerica.EnterpriseMessaging.Common.Enums;
using FCSAmerica.EnterpriseMessaging.Common.Objects;
using FCSAmerica.McGruff.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace FCSAmerica.Transact.WebUI.Common
{
    public class MessageUtility : IMessageUtility
    {
        private readonly IEcsSettings _settings;
        private readonly ISecurityContext _securityContext;

        public MessageUtility(IEcsSettings settings, ISecurityContext securityContext)
        {
            _settings = settings;
            _securityContext = securityContext;
        }

        public void SendToDo(ToDo toDo, string mcGruffToken)
        {
            using (WebClient wc = new WebClient())
            {
                Uri path = new Uri(_settings.ToDoApiAddress);
                wc.Headers.Add("Authorization", mcGruffToken);
                wc.Headers.Add("Content-Type", "application/json");
                wc.UploadString(path, Newtonsoft.Json.JsonConvert.SerializeObject(toDo));
            }
        }

        public void SendMail(Mail mail)
        {
            using (WebClient wc = new WebClient())
            {
                Uri path = new Uri(_settings.MailApiAddress);
                wc.Headers.Add("Authorization", _securityContext.ServiceToken.ToString());
                wc.Headers.Add("Content-Type", "application/json");
                wc.UploadString(path, Newtonsoft.Json.JsonConvert.SerializeObject(mail));
            }
        }

        public void SendEmail(string subject, string messageBody)
        {
            var mail = new Mail
            {
                From = _settings.EmailResponseFrom,
                Recipients = _settings.JobNotificationRecipientList.Split(',').ToList(),
                Subject = AppendEnvironment(subject),
                Message = messageBody,
                Cc = new List<string>(),
                Bcc = new List<string>(),
                Priority = Priority.Medium,
                SystemName = _settings.SystemName,
                Attachment = null
            };

            SendMail(mail);
        }

        public ToDo BuildTodo(string customerId, string message, string subject)
        {
            var todo = new ToDo()
            {
                Subject = subject,
                Message = message,
                AssignTo = "",
                Channel = "",
                //ROOFM = roofm,
                AssignedBy = "Messenger@fcsamerica.com",
                //CivId = customerId,
                Priority = Priority.Medium,
                SystemName = _settings.SystemName
            };

            return todo;
        }

        private string AppendEnvironment(string subject)
        {
            return string.Format("{0} - {1}", subject, _settings.Environment);
        }
    }
}
