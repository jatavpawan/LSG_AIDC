using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using System;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents.MockFactories
{
    public class CoreAccountsCacheFactory
    {
        static Random rnd = new Random(18);
        public static List<Account> GetAccountsByCustomerId(int customerId)
        {
            return new List<Account>
            {
                new Account
                {
                    AccountId = 357779,
                    AccountNumber = 12345,
                    PrePayRestriction = "0",
                    ScheduledPaymentAmount = 10000

                },
                new Account
                {
                    AccountId = 357799,
                    AccountNumber = 56789,
                    PrePayRestriction = "1",
                    ScheduledPaymentAmount = 10000
                },
                new Account
                {
                    AccountId = 358789,
                    AccountNumber = 98773,
                    PrePayRestriction = "0",
                    ScheduledPaymentAmount = 10000
                }
            };
        }

        public static List<Account> GetCounterDraftEligibleAccounts(int customerId)
        {
            return new List<Account>
            {
                new Account
                {
                    AccountId = 357779,
                    AccountNumber = 12345,
                    Office = new Office()
                    {
                        OfficeId = 1,
                        OfficeName = "Omaha",
                        RegionId = 1,
                        RegionName = "SouthEast"
                    },
                    ScheduledPaymentAmount = 10000
                },
                new Account
                {
                    AccountId = 357799,
                    AccountNumber = 6789,
                    Office = new Office()
                    {
                        OfficeId = 2,
                        OfficeName = "New York",
                        RegionId = 2,
                        RegionName = "NorthEast"
                    },
                    ScheduledPaymentAmount = 10000
                }
            };
        }
    }
}
