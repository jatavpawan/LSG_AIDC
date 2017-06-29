using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.Client.Models
{
    public class Office
    {
        public int OfficeId { get; set; }
        public string OfficeName { get; set; }
        public int RegionId { get; set; }
        public string RegionName { get; set; }
        public int OfficeCostCenter { get; set; }
    }
}
