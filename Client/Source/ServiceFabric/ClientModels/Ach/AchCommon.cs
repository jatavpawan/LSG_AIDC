using System;

namespace FCSAmerica.Transact.Client.Models.Ach
{
    public class AchCommon
    {
        public string AccountNumber { get; set; }
        public string Amount { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}