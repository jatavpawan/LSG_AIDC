using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.Client.Models.Accounts
{
    public class AccountDetail : Account
    {
        public string ProductTypeDescription { get; set; }
        public double? LoanLiabilityBalance { get; set; }
        public DateTime? CurrentDueDate { get; set; }
        public DateTime? PastDueDate { get; set; }
        public double? PastDueAmount { get; set; }
        public double? AccruedInterest { get; set; }
        public DateTime? LastRenewalDate { get; set; }
        public double? FeeAmount { get; set; }
        public double? LateChargeAmount { get; set; }
        public double? InterestRate { get; set; }
        public double? PerDiem { get; set; }
        public double? InterestPaidToDate { get; set; }
        public double? InterestPaidEarnedLastYear { get; set; }
        public double? InterestReportedIrsAmount { get; set; }
        public int? FinalRiskRating { get; set; }
    }
}
