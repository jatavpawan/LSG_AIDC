using System;

namespace FCSAmerica.Transact.Client.Models.Wires
{
    public class RetailWireInAssignment
    {
        public int AccountNumber { get; set; }
        public DateTime AssignmentDate { get; set; }
        public int HowToApplyId { get; set; }
        public decimal Amount { get; set; }
        public string Descriptiong { get; set; }
    }
}
