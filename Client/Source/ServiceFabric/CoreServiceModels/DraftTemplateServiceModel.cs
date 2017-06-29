using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.ServiceModels
{
    public class DraftTemplateServiceModel
    {
        public int DraftId { get; set; }
        public string Account { get; set; }
        public decimal Amount { get; set; }
        public int DraftNumber { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Bank { get; set; }
        public string CostCenter { get; set; }
        public string CustomerName { get; set; }
        public string PreparedBy { get; set; }        
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
