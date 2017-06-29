using System;

namespace FCSAmerica.Transact.Client.Models
{
    public class Holiday
    {
        private DateTime _holidayDate;

        public string holidayDate
        {
            get { return _holidayDate.ToShortDateString(); }
            set { _holidayDate = DateTime.Parse(value); }
        }
        public string holidayDescription { get; set; }
        public bool isNonprocessingDayFederal { get; set; }
    }
}
