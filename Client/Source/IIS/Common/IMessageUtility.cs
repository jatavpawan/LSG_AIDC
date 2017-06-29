using FCSAmerica.EnterpriseMessaging.Common.Objects;

namespace FCSAmerica.Transact.WebUI.Common
{
    public interface IMessageUtility
    {
        void SendToDo(ToDo toDo, string mcGruffToken);
        void SendMail(Mail mail);
        void SendEmail(string subject, string messageBody);
        ToDo BuildTodo(string customerId, string message, string subject);
    }
}
