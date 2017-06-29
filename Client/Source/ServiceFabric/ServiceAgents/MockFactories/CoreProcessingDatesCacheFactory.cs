using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.ServiceAgents.MockFactories
{
    public class CoreProcessingDatesCacheFactory
    {
        public static List<string> GetProcessingDates(PaymentSchedule schedule)
        {
            var processingDates = new List<string>();
            if (schedule.Frequency == "once")
            {
                processingDates.Add(schedule.OneTimePaymentDate?.ToShortDateString());
            }
            else if (schedule.Frequency == "recurring")
            {
                processingDates.Add("1/1/17");
                processingDates.Add("1/15/17");
                processingDates.Add("1/31/17");

                processingDates.Add("2/1/17");
                processingDates.Add("2/15/17");
                processingDates.Add("2/28/17");

                processingDates.Add("3/1/17");
                processingDates.Add("3/15/17");
                processingDates.Add("3/31/17");

                processingDates.Add("4/1/17");
                processingDates.Add("4/15/17");
                processingDates.Add("4/30/17");

                processingDates.Add("1/1/17");
                processingDates.Add("1/15/17");
                processingDates.Add("1/31/17");

                processingDates.Add("2/1/17");
                processingDates.Add("2/15/17");
                processingDates.Add("2/28/17");

                processingDates.Add("3/1/17");
                processingDates.Add("3/15/17");
                processingDates.Add("3/31/17");

                processingDates.Add("4/1/17");
                processingDates.Add("4/15/17");
                processingDates.Add("4/30/17");

                processingDates.Add("1/1/17");
                processingDates.Add("1/15/17");
                processingDates.Add("1/31/17");

                processingDates.Add("2/1/17");
                processingDates.Add("2/15/17");
                processingDates.Add("2/28/17");

                processingDates.Add("3/1/17");
                processingDates.Add("3/15/17");
                processingDates.Add("3/31/17");

                processingDates.Add("4/1/17");
                processingDates.Add("4/15/17");
                processingDates.Add("4/30/17");

                processingDates.Add("1/1/17");
                processingDates.Add("1/15/17");
                processingDates.Add("1/31/17");

                processingDates.Add("2/1/17");
                processingDates.Add("2/15/17");
                processingDates.Add("2/28/17");

                processingDates.Add("3/1/17");
                processingDates.Add("3/15/17");
                processingDates.Add("3/31/17");

                processingDates.Add("4/1/17");
                processingDates.Add("4/15/17");
                processingDates.Add("4/30/17");

                processingDates.Add("1/1/17");
                processingDates.Add("1/15/17");
                processingDates.Add("1/31/17");

                processingDates.Add("2/1/17");
                processingDates.Add("2/15/17");
                processingDates.Add("2/28/17");

                processingDates.Add("3/1/17");
                processingDates.Add("3/15/17");
                processingDates.Add("3/31/17");

                processingDates.Add("4/1/17");
                processingDates.Add("4/15/17");
                processingDates.Add("4/30/17");
            }

            return processingDates;
        }
    }
}
