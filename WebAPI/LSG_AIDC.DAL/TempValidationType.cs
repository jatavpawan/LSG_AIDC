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
    
    public partial class TempValidationType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TempValidationType()
        {
            this.PHF_CodeMap = new HashSet<PHF_CodeMap>();
            this.VendorDeliveryMaterial = new HashSet<VendorDeliveryMaterial>();
        }
    
        public string TempValidationCode { get; set; }
        public string DisplayCode { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> MinTemp { get; set; }
        public Nullable<decimal> MaxTemp { get; set; }
        public string ComparisonOperator { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PHF_CodeMap> PHF_CodeMap { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<VendorDeliveryMaterial> VendorDeliveryMaterial { get; set; }
    }
}
