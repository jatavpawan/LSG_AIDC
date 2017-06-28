//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LSG_AIDC.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class VendorDelivery
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public VendorDelivery()
        {
            this.PO_Worklist = new HashSet<PO_Worklist>();
            this.VendorDeliveryMaterial = new HashSet<VendorDeliveryMaterial>();
        }
    
        public int VendorDelivery_ID { get; set; }
        public Nullable<System.DateTime> DeliveryArrivalDate { get; set; }
        public Nullable<System.DateTime> DeliveryCompletionDate { get; set; }
        public Nullable<System.DateTime> FirstExpectedDeliveryDate { get; set; }
        public Nullable<byte> IsInspectionRequired { get; set; }
        public string DeliveryStatus { get; set; }
        public string SAP_VendorName { get; set; }
        public string SAP_Vendor_ID { get; set; }
    
        public virtual DeliveryStatus DeliveryStatus1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PO_Worklist> PO_Worklist { get; set; }
        public virtual TruckInspection TruckInspection { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<VendorDeliveryMaterial> VendorDeliveryMaterial { get; set; }
    }
}
