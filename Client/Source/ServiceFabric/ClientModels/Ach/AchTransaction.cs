using FCSAmerica.Transact.Client.Common.enums;
using System;

namespace FCSAmerica.Transact.Client.Models.Ach
{
    /// <summary>
    /// The ach transaction.
    /// </summary>
    public class AchTransaction
    {
        /// <summary>
        /// Gets or sets the ach id.
        /// </summary>
        public int AchId { get; set; }

        /// <summary>
        /// Gets or sets the rejection reason id.
        /// </summary>
        public int RejectionReasonId { get; set; }

        /// <summary>
        /// Gets or sets the reject reason description.
        /// </summary>
        public string RejectReasonDescription { get; set; }

        /// <summary>
        /// Gets or sets the other note.
        /// </summary>
        public string OtherNote { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether form 2269.
        /// </summary>
        public bool Form2269 { get; set; }

        /// <summary>
        /// Gets or sets the external account number.
        /// </summary>
        public string ExternalAccountNumber { get; set; }

        public string Purpose { get; set; }

        /// <summary>
        /// Gets or sets the amount.
        /// </summary>
        public decimal Amount { get; set; }

        /// <summary>
        /// Gets or sets the company name.
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Gets or sets the transaction type.
        /// </summary>
        public GenericEnumMap TransactionDirection { get; set; }

        /// <summary>
        /// Gets or sets the transaction date.
        /// </summary>
        public DateTime TransactionDate { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether older than 24 hours.
        /// </summary>
        public bool OlderThan24Hours { get; set; }

        /// <summary>
        /// Gets or sets the customer name.
        /// </summary>
        public string CustomerName { get; set; }

        /// <summary>
        /// Gets or sets the office.
        /// </summary>
        public Office Office { get; set; }

        /// <summary>
        /// Gets or sets the bank name.
        /// </summary>
        public string BankName { get; set; }

        /// <summary>
        /// Gets or sets the preparer.
        /// </summary>
        public string Preparer { get; set; }

        /// <summary>
        /// Gets or sets the status.
        /// </summary>
        public AchStatus Status { get; set; }

        /// <summary>
        /// The status display.
        /// </summary>
        public string StatusDisplay => IsDeletedRejection == true ? "Deleted" : Status.ToString();


        /// <summary>
        /// The transaction type display.
        /// </summary>
        public string TransactionTypeDisplay => "Reject ACH " + TransactionDirection;

        /// <summary>
        /// Gets or sets a value indicating whether is deleted rejection.
        /// </summary>
        public bool? IsDeletedRejection { get; set; }
    }
}
