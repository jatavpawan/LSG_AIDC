using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.ServiceModels
{
    public class DraftImageServiceModel
    {
        public int DraftFileRowId { get; set; }

        public byte[] FrontImage { get; set; }

        public byte[] BackImage{ get; set; }

    }
}
