namespace FCSAmerica.Transact.Client.Models.Wires
{
    public class WiresInAssignment
    {
        public int WireInId { get; set; }
        public int? OfficeId { get; set; }
        public int? GLAccountId { get; set; }
        public string Comments { get; set; }
    }
}
