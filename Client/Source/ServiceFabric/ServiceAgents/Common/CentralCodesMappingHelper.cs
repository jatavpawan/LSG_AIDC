using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.ServiceModels;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents.Common
{
    public class CentralCodesMappingHelper
    {
        public static List<Holiday> MapHolidayRootObjectServiceModelToClientModel(HolidayRootObjectServiceModel holidayRootObjectServiceModel)
        {
            var returnHolidays = new List<Holiday>();
            foreach (var holiday in holidayRootObjectServiceModel._embedded.Codes)
            {
                returnHolidays.Add(MapHolidayServiceModelToClientModel(holiday));
            }

            return returnHolidays;
        }

        private static Holiday MapHolidayServiceModelToClientModel(HolidayServiceModel holiday)
        {
            return new Holiday
            {
                holidayDate = holiday.holidayDate,
                holidayDescription = holiday.holidayDescription,
                isNonprocessingDayFederal = holiday.isNonprocessingDayFederal
            };
        }
    }
}

