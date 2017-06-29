namespace FCSAmerica.Transact.Client.Models.Ach.Schedule
{
    public class PaymentType
    {
        //Table needs to be created in central codes
        public int PaymentTypeId { get; set; }
        public bool IsOneTimePayment { get; set; }
        public string Description { get; set; }
    }
}