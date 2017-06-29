using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.ServiceModels
{
    public class CounterDraftServiceModel
    {
        public int CounterDraftId { get; set; }
        public int CustomerId { get; set; }
        public long LASAccountNumber { get; set; }
        public int OfficeId { get; set; }
        public int BeginningDraftNumber { get; set; }
        public int EndingDraftNumber { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string PreparedBy { get; set; }
    }
}
