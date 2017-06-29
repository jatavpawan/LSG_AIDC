using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.ServiceModels
{
    public class DraftSearchServiceModel
    {
        public string Cif { get; set; }
        public long? AccountNumber { get; set; }
        public int? FromDraftNumber { get; set; }
        public int? ToDraftNumber { get; set; }
        public int[] DraftNumberList { get; set; }
        public decimal? FromAmount { get; set; }
        public decimal? ToAmount { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public long? CustomerId { get; set; }
    }
}
