using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.Client.Models
{
    public class UserSetting
    {
        public int UserId { get; set; }
        public string LoginName { get; set; }
        public int RegionId { get; set; }
        public string RegionName { get; set; }
    }
}
