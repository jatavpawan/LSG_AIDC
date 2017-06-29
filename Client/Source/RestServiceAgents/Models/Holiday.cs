using System;
using System.Collections.Generic;

namespace FCSAmerica.Transact.RestServiceAgents.Models
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

    public class EmbeddedHoliday
    {
        public List<Holiday> Codes { get; set; }
    }

    public class HolidayRootObject
    {
        public EmbeddedHoliday _embedded { get; set; }
        public string schema { get; set; }
        public string tableName { get; set; }
    }

}
