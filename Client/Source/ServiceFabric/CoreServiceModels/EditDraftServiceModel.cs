using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.ServiceModels
{
    public class EditDraftServiceModel
    {
        public int DraftId { get; set; }
        public decimal Amount { get; set; }
        public int DraftNumber { get; set; }
        public long AccountNumber { get; set; }
    }
}
