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
    
    public partial class NLINK_ActivityProgress
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NLINK_ActivityProgress()
        {
            this.NLINK_PostReceipt = new HashSet<NLINK_PostReceipt>();
        }
    
        public int NLINK_ActivityProgress_ID { get; set; }
        public string ProcessPhaseCode { get; set; }
        public string ActivityCode { get; set; }
        public string ActivityStatus { get; set; }
        public Nullable<int> ProgressPercentage { get; set; }
        public Nullable<System.DateTime> StartTime { get; set; }
        public Nullable<System.DateTime> EndTime { get; set; }
        public string SystemMessage { get; set; }
        public string ApplicationMessage { get; set; }
    
        public virtual NLINK_ProcessActivityType NLINK_ProcessActivityType { get; set; }
        public virtual NLINK_ProgressPhaseType NLINK_ProgressPhaseType { get; set; }
        public virtual NLINK_ActivityStatus NLINK_ActivityStatus { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NLINK_PostReceipt> NLINK_PostReceipt { get; set; }
    }
}
