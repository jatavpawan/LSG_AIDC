using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.ServiceAgents.MockFactories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent : ICoreProcessingDatesServiceAgent
    {
        public List<string> GetProcessingDates(PaymentSchedule schedule)
        {
            return CoreProcessingDatesCacheFactory.GetProcessingDates(schedule);
        }
    }
}
