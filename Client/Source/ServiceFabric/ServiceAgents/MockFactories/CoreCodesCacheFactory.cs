using FCSAmerica.Transact.Client.Models;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents.MockFactories
{
    public class CoreCodesCacheFactory
    {
        public static List<Office> GetOffices()
        {
            var offices = new List<Office>();

            var office = new Office
            {
                OfficeId = 1,
                OfficeName = "Omaha"
            };

            offices.Add(office);

            office = new Office
            {
                OfficeId = 2,
                OfficeName = "Lincoln"
            };

            offices.Add(office);

            office = new Office
            {
                OfficeId = 3,
                OfficeName = "Ottumwa"
            };

            offices.Add(office);

            return offices;
        }
    }
}
