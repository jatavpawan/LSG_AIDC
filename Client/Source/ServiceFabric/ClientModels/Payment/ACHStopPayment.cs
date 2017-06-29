using System.Globalization;

namespace FCSAmerica.Transact.Client.Models.Payment
{
    public class ACHStopPayment
    {
        public string CompanyName { get; set; }
        public decimal FromAmount { get; set; }
        public decimal? ToAmount { get; set; }
        public string DisplayFromAmount => FromAmount.ToString(CultureInfo.CurrentCulture);
        public string DisplayToAmount => ToAmount?.ToString(CultureInfo.CurrentCulture);
    }
}