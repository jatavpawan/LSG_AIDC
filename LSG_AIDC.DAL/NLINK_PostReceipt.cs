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
    
    public partial class NLINK_PostReceipt
    {
        public string SAP_PO_ID { get; set; }
        public int NLINK_ActivityProgress_ID { get; set; }
    
        public virtual NLINK_ActivityProgress NLINK_ActivityProgress { get; set; }
    }
}
