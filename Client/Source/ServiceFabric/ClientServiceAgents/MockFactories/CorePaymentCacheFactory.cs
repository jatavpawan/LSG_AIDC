using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FCSAmerica.Transact.Client.Common.Enums;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Payment;

namespace FCSAmerica.Transact.ServiceAgents.MockFactories
{
    public static class CorePaymentCacheFactory
    {
        private static readonly List<StopPayment> _stopPayments = new List<StopPayment>();

        public static List<StopPayment> GetCachedStopPayments()
        {
            if (_stopPayments.Any() == false)
            {
                _stopPayments.Add(new StopPayment
                {
                    StopPaymentId = 1,
                    Account = new Account
                    {
                        AccountId = 1,
                        NoteNumber = 12345,
                        Office = new Office()
                    },
                    IsRegionalAccount = true,
                    StopPaymentType = StopPaymentType.Ach,
                    BeginningAmount = "$123.56",
                    EndingAmount = "$130",
                    BeginningDraftNumber = 101,
                    EndingDraftNumber = 103,
                    CompanyName = "Acme Products",
                    Description = "Test",
                    ExpirationDate = new DateTime().AddMonths(3),
                    UserName = "Test User",
                    AuditInfo = new AuditInfo
                    {
                        CreatedBy = "Test User",
                        CreatedOn = DateTime.Today,
                        UpdatedBy = "Test User",
                        UpdatedOn = DateTime.Today
                    }
                });

                _stopPayments.Add(new StopPayment
                {
                    StopPaymentId = 2,
                    Account = new Account
                    {
                        AccountId = 2,
                        NoteNumber = 345678,
                        Office = new Office()
                    },
                    IsRegionalAccount = true,
                    StopPaymentType = StopPaymentType.Ach,
                    BeginningAmount = "$323.56",
                    EndingAmount = "$230",
                    BeginningDraftNumber = 101,
                    EndingDraftNumber = 103,
                    CompanyName = "Acme Products",
                    Description = "Test",
                    ExpirationDate = new DateTime().AddMonths(3),
                    UserName = "Test User",
                    AuditInfo = new AuditInfo
                    {
                        CreatedBy = "Test User",
                        CreatedOn = DateTime.Today,
                        UpdatedBy = "Test User",
                        UpdatedOn = DateTime.Today
                    }
                });
                _stopPayments.Add(new StopPayment
                {
                    StopPaymentId = 3,
                    Account = new Account
                    {
                        AccountId = 3,
                        NoteNumber = 1234567,
                        Office = new Office()
                    },
                    IsRegionalAccount = false,
                    StopPaymentType = StopPaymentType.Ach,
                    BeginningAmount = "$323.56",
                    EndingAmount = "$230",
                    BeginningDraftNumber = 101,
                    EndingDraftNumber = 103,
                    CompanyName = "Acme Products",
                    Description = "Test",
                    ExpirationDate = new DateTime().AddMonths(3),
                    UserName = "Test User",
                    AuditInfo = new AuditInfo
                    {
                        CreatedBy = "Test User",
                        CreatedOn = DateTime.Today,
                        UpdatedBy = "Test User",
                        UpdatedOn = DateTime.Today
                    }
                });
            }

            return _stopPayments;
        }

        public static void DeleteCachedStopPayment(int stopPaymentId)
        {
            for (int i = 0; i < _stopPayments.Count; i++)
            {
                if (_stopPayments[i].StopPaymentId == stopPaymentId)
                {
                    _stopPayments.RemoveAt(i);
                    break;
                }
            }
        }

        public static int CreateAchTransaction(StopPayment stopPayment)
        {
            var maxStopPAymentId = _stopPayments.Max(x => x.StopPaymentId);

            stopPayment.StopPaymentId = maxStopPAymentId + 1;
            _stopPayments.Add(stopPayment);

            return stopPayment.StopPaymentId;
        }
    }
}
