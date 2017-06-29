namespace FCSAmerica.Transact.Client.Models.Wires
{
    public class WireInSender
    {
        public string Name { get; set; }
        public string ABANumber { get; set; }
        public string ReferenceNumber { get; set; }
        public string ReceivedFrom { get; set; }
        public string ByOrderOf { get; set; }
    }
}
