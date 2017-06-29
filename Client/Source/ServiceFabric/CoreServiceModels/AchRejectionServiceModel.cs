namespace FCSAmerica.Transact.ServiceModels
{
    public class AchRejectionServiceModel
    {
        public int RejectId { get; set; }
        public int AchId { get; set; }
        public Common.LocalConstants.RejectReason RejectReason { get; set; }
        public string Description { get; set; }
        public bool IsFormComplete { get; set; }
        public bool IsActive { get; set; }
    }
}
