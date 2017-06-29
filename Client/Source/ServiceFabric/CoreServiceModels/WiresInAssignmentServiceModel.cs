namespace FCSAmerica.Transact.Client.Models.Wires
{
    public class WiresInAssignmentServiceModel
    {
        public int WireInId { get; set; }
        public int? OfficeId { get; set; }
        public int? GLAccount { get; set; }
        public string Comment { get; set; }
    }
}
