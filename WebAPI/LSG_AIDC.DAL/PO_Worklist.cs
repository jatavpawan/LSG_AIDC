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
    
    public partial class PO_Worklist
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PO_Worklist()
        {
            this.PO_WorkListItem = new HashSet<PO_WorkListItem>();
        }
    
        public int PO_WorkList_ID { get; set; }
        public int VendorDelivery_ID { get; set; }
        public string PO_PhaseStatus { get; set; }
        public string Operator_ID { get; set; }
        public string Entered_PO_Number { get; set; }
        public Nullable<byte> IsUnexpected { get; set; }
        public Nullable<System.DateTime> SAP_ExpectedDeliveryDate { get; set; }
        public string SAP_PO_ID { get; set; }
        public string SAP_Vendor_ID { get; set; }
        public string SAP_VendorName { get; set; }
    
        public virtual PO_PhaseStatus PO_PhaseStatus1 { get; set; }
        public virtual VendorDelivery VendorDelivery { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PO_WorkListItem> PO_WorkListItem { get; set; }
    }
}