namespace FCSAmerica.Transact.WebUI.Common
{
    public interface IEcsSettings
    {
        string Environment { get; set; }
        string WebApiRecycler { get; set; }
        string ToDoApiAddress { get; set; }
        string MailApiAddress { get; set; }
        string EmailResponseFrom { get; set; }
        string JobNotificationRecipientList { get; set; }
        string SystemName { get; set; }
        string ServiceFabricApi { get; set; }
        string CentralCodesApi { get; set; }
    }
}