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
    
    public partial class PO_PhaseStatus
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PO_PhaseStatus()
        {
            this.PO_Worklist = new HashSet<PO_Worklist>();
        }
    
        public string PO_PhaseStatusCode { get; set; }
        public string DisplayStatusCode { get; set; }
        public string Description { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PO_Worklist> PO_Worklist { get; set; }
    }
}
