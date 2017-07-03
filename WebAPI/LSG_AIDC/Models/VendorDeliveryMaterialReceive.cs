using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LSG_AIDC.Models
{
    public class VendorDeliveryMaterialReceive
    {
        public string Sap_PoId { get; set; }
        public string Sap_MaterialId { get; set; }
        public string Sap_Description { get; set; }
        public string Sap_OrderUoM { get; set; }
        public int QuantityExpected { get; set; }
        public string Sap_BaseUoM { get; set; }
        public int QuantityNormalDistribution { get; set; }
    }
}