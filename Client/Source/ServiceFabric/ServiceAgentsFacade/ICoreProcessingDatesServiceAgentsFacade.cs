using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public interface ICoreProcessingDatesServiceAgentsFacade
    {
        List<string> GetProcessingDates(PaymentSchedule schedule);
    }
}
