using FCSAmerica.Transact.Client.Models;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICentralCodesServiceAgent
    {
        List<Holiday> GetHolidays();
    }
}