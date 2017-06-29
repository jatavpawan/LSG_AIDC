namespace FCSAmerica.Transact.ServiceModels
{
    public class AchRejectReasonCodeServiceModel
    {
        public int AchRejectReasonId { get; set; }
        public string Description { get; set; }
        public int TransactionTypeId { get; set; }
        public bool IsActive { get; set; }
    }
}
