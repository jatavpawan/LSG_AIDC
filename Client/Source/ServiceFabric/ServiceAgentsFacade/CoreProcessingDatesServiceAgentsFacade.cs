using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.ServiceAgents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public class CoreProcessingDatesServiceAgentsFacade : ICoreProcessingDatesServiceAgentsFacade
    {
        private readonly ICoreProcessingDatesServiceAgent _processingDatesServiceAgent;

        public CoreProcessingDatesServiceAgentsFacade(ICoreProcessingDatesServiceAgent processingDatesServiceAgent)
        {
            _processingDatesServiceAgent = processingDatesServiceAgent;
        }
        public List<string> GetProcessingDates(PaymentSchedule schedule)
        {
            return _processingDatesServiceAgent.GetProcessingDates(schedule);
        }
    }
}
