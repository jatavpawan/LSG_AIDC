
namespace FCSAmerica.Transact.WebUI.Common
{
    public class EcsSettings : IEcsSettings
    {
        public string Environment { get; set; }
        public string WebApiRecycler { get; set; }
        public string ToDoApiAddress { get; set; }
        public string MailApiAddress { get; set; }
        public string EmailResponseFrom { get; set; }
        public string JobNotificationRecipientList { get; set; }
        public string SystemName { get; set; }
        public string ServiceFabricApi { get; set; }
        public string CentralCodesApi { get; set; }
    }
}