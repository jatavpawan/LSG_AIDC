using System;

namespace FCSAmerica.Transact.ServiceModels
{
    public class FeeTypeServiceModel
    {
        public int FeeTypeId { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public int EnumValue { get; set; }
        public string EnumText { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}