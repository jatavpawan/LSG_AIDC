using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.ServiceModels;
using System.Collections.Generic;

namespace ClientBusinessLogic.Tests.Common
{
    public class HolidayTestModelFactory
    {
        public static List<Holiday> CreateFakeHolidayList()
        {
            var fakeHolidayList = new List<Holiday>();

            var holiday = new Holiday
            {
                holidayDate = "01/01/2017",
                holidayDescription = "test holiday",
                isNonprocessingDayFederal = true
            };

            fakeHolidayList.Add(holiday);

            return fakeHolidayList;
        }

        public static HolidayRootObjectServiceModel CreateFakeHolidayRootObjectServiceModel()
        {
            var fakeHolidayRootObjectServiceModel = new HolidayRootObjectServiceModel()
            {
                _embedded = new EmbeddedHolidayServiceModel
                {
                    Codes = new List<HolidayServiceModel>
                    {
                        new HolidayServiceModel
                        {
                            holidayDate = "01/01/2017",
                            holidayDescription = "test holiday",
                            isNonprocessingDayFederal = true
                        }
                    }
                }
            };

            return fakeHolidayRootObjectServiceModel;
        }
    }
}
