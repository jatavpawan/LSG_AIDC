using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICoreProcessingDatesServiceAgent
    {
        List<string> GetProcessingDates(PaymentSchedule schedule);
    }
}
