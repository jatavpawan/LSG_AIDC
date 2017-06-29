using FCSAmerica.Transact.Client.Common.Enums;
using FCSAmerica.Transact.Client.Models.Accounts;
using System;

namespace FCSAmerica.Transact.Client.Models
{
    public class Draft
    {
        public int DraftId { get; set; }
        public int Cif { get; set; }
        public int? DraftNumber { get; set; }
        public decimal? Amount { get; set; }
        public DateTime Date { get; set; }
        public Bank Bank { get; set; }
        public DraftStatus Status { get; set; }
        public Account Account { get; set; }
        public AuditInfo AuditInfo { get; set; }
    }
}
