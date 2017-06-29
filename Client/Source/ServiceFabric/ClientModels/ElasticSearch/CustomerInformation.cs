using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.Client.Models.ElasticSearch
{
    public class CustomerInformation
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public int CustomerId { get; set; }
        public string Cif { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
        public string LastFourSsn { get; set; }
        public string YearOfBirth { get; set; }
        public string ContactRoleName { get; set; }
        public string OfficeName { get; set; }
        public int? OfficeCode { get; set; }
        public string EntityName { get; set; }
        public string DisplayNameReverse { get; set; }
        public DateTime? EuasUpdatedOn { get; set; }

        public string DealPid { get; set; }
        public string DealName { get; set; }

        public string FacilityPid { get; set; }
        public string FacilityName { get; set; }

        public long? AccountId { get; set; }
        public int? NoteNumber { get; set; }
        public long? LasAccountNumber { get; set; }

        public bool IsDisabled { get; set; }

        public string DealHostBank { get; set; }
        public string DealRelationshipTypeDesc { get; set; }
        public double? DealHostBankNetCurrentCommitment { get; set; }
        public double? DealFcsAmericaNetHold { get; set; }

        public string FacilityPrimaryCustomerName { get; set; }
        public string FacilityCommitmentTypeDesc { get; set; }
        public double? FacilityAvailableToDraw { get; set; }
        public double? FacilityOutstandingPrincipalBalance { get; set; }
        public string FacilityAssociation { get; set; }
        public string FacilityRelationshipTypeDesc { get; set; }
        public string Fcn { get; set; }

        public string AccountDescription { get; set; }
        public string ProductTypeDescription { get; set; }
        public double? LoanLiabilityBalance { get; set; }
        public double? CommitmentFcsAvailableAmount { get; set; }
        public DateTime? MaturityDate { get; set; }
        public DateTime? CurrentDueDate { get; set; }
        public DateTime? PastDueDate { get; set; }
        public double? PastDueAmount { get; set; }
        public double? CurrentBilledAmount { get; set; }
        public double? AccruedInterest { get; set; }
        public DateTime? LastRenewalDate { get; set; }
        public double? FeeAmount { get; set; }
        public double? LateChargeAmount { get; set; }
        public string PrePayRestriction { get; set; }
        public double? InterestRate { get; set; }
        public double? PerDiem { get; set; }
        public double? InterestPaidToDate { get; set; }
        public double? InterestPaidEarnedLastYear { get; set; }
        public double? InterestReportedIrsAmount { get; set; }
        public int? FinalRiskRating { get; set; }
    }
}
