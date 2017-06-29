using System.Globalization;

namespace FCSAmerica.Transact.Client.Models.Payment
{
    public class DraftStopPayment
    {
        public int BeginningDraftNumber { get; set; }
        public int EndingDraftNumber { get; set; }
        public decimal? Amount { get; set; }
        public string DisplayAmount => Amount?.ToString(CultureInfo.CurrentCulture);
    }
}