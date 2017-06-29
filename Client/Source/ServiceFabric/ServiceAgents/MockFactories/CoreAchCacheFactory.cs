using FCSAmerica.Transact.Client.Common.enums;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Ach;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FCSAmerica.Transact.ServiceAgents.MockFactories
{
    public static class CoreAchCacheFactory
    {

        private static readonly List<AchTransaction> _transactions = new List<AchTransaction>();

        public static List<AchTransaction> GetCachedTransactions()
        {
            Random rnd = new Random(18);

            if (!_transactions.Any())
            {
                #region "Creates"

                _transactions.Add(
                    new AchTransaction
                    {
                        AchId = 1,
                        Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                        TransactionDirection = new GenericEnumMap() { Id = 1, Description = "In" },
                        Status = AchStatus.Active,
                        TransactionDate = DateTime.Now,
                        CompanyName = "Test Widgets",
                        BankName = "First National",
                        ExternalAccountNumber = "101"
                    }
                );

                _transactions.Add(
                    new AchTransaction
                    {
                        AchId = 2,

                        Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                        TransactionDirection = new GenericEnumMap() { Id = 1, Description = "In" },
                        Status = AchStatus.Rejected,
                        RejectionReasonId = 1,
                        TransactionDate = DateTime.Now,
                        CompanyName = "Test Widgets",
                        BankName = "Wells Fargo",
                        ExternalAccountNumber = "101"
                    }
                );

                _transactions.Add(
                    new AchTransaction
                    {
                        AchId = 3,
                        Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                        TransactionDirection = new GenericEnumMap() { Id = 2, Description = "Out" },
                        Status = AchStatus.Active,
                        TransactionDate = DateTime.Now.AddDays(-2),
                        CompanyName = "Test Widgets",
                        BankName = "Wells Fargo",
                        ExternalAccountNumber = "101"
                    }
                );

                _transactions.Add(
                    new AchTransaction
                    {
                        AchId = 4,
                        Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                        TransactionDirection = new GenericEnumMap() { Id = 2, Description = "Out" },
                        Status = AchStatus.Active,
                        TransactionDate = DateTime.Now.AddDays(-1),
                        CompanyName = "Test Widgets",
                        BankName = "First National",
                        ExternalAccountNumber = "101"
                    }
                );
                _transactions.Add(
                    new AchTransaction
                    {
                        AchId = 5,
                        Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                        TransactionDirection = new GenericEnumMap() { Id = 1, Description = "In" },
                        Status = AchStatus.Rejected,
                        RejectionReasonId = 3,
                        TransactionDate = DateTime.Now.AddDays(-2),
                        CompanyName = "Test Widgets",
                        BankName = "Wells Fargo",
                        ExternalAccountNumber = "101"
                    }
                );

                _transactions.Add(
                    new AchTransaction
                    {
                        AchId = 6,
                        Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                        TransactionDirection = new GenericEnumMap() { Id = 2, Description = "Out" },
                        Status = AchStatus.Active,
                        TransactionDate = DateTime.Now,
                        CompanyName = "Test Widgets",
                        BankName = "First National",
                        ExternalAccountNumber = "101"
                    }
                );

                _transactions.Add(
                    new AchTransaction
                    {
                        AchId = 7,
                        Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                        TransactionDirection = new GenericEnumMap() { Id = 1, Description = "In" },
                        Status = AchStatus.Rejected,
                        RejectionReasonId = 3,
                        TransactionDate = DateTime.Now.AddDays(-5),
                        CompanyName = "Test Widgets",
                        BankName = "Wells Fargo",
                        ExternalAccountNumber = "101"
                    }
                );

                _transactions.Add(
                     new AchTransaction
                     {
                         AchId = 8,
                         Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                         TransactionDirection = new GenericEnumMap() { Id = 1, Description = "In" },
                         Status = AchStatus.Active,
                         TransactionDate = DateTime.Now,
                         CompanyName = "Test Widgets",
                         BankName = "U.S. Bank",
                         ExternalAccountNumber = "101"
                     }

                 );

                _transactions.Add(
                    new AchTransaction
                    {
                        AchId = 9,
                        Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                        TransactionDirection = new GenericEnumMap() { Id = 2, Description = "Out" },
                        Status = AchStatus.Active,
                        TransactionDate = DateTime.Now,
                        CompanyName = "Test Widgets",
                        BankName = "U.S. Bank",
                        ExternalAccountNumber = "101"
                    }
                );

                _transactions.Add(
                    new AchTransaction
                    {
                        AchId = 10,
                        Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                        TransactionDirection = new GenericEnumMap() { Id = 1, Description = "In" },
                        Status = AchStatus.Rejected,
                        RejectionReasonId = 2,
                        TransactionDate = DateTime.Now,
                        CompanyName = "Test Widgets",
                        BankName = "U.S. Bank",
                        ExternalAccountNumber = "104"
                    }
                );

                _transactions.Add(
                    new AchTransaction
                    {
                        AchId = 11,
                        Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                        TransactionDirection = new GenericEnumMap() { Id = 2, Description = "Out" },
                        Status = AchStatus.Rejected,
                        RejectionReasonId = 3,
                        TransactionDate = DateTime.Now,
                        CompanyName = "Test Widgets",
                        BankName = "U.S. Bank",
                        ExternalAccountNumber = "103"
                    }
                );

                _transactions.Add(
                    new AchTransaction
                    {
                        AchId = 12,
                        Amount = decimal.Parse((rnd.NextDouble() * 1000).ToString("##.##")),
                        TransactionDirection = new GenericEnumMap() { Id = 2, Description = "Out" },
                        Status = AchStatus.Rejected,
                        RejectionReasonId = 1,
                        TransactionDate = DateTime.Now.AddDays(-1),
                        CompanyName = "Test Widgets",
                        BankName = "U.S. Bank",
                        ExternalAccountNumber = "102"
                    }
                );

                #endregion

            }
            return _transactions;
        }

        public static void DeleteCachedAchTransaction(int achId)
        {
            if (_transactions == null || _transactions.Count == 0)
            {
                GetCachedTransactions();
            }

            for (int i = 0; i < _transactions.Count; i++)
            {
                if (_transactions[i].AchId == achId)
                {
                    _transactions.Remove(_transactions[i]);
                    break;
                }
            }
        }

        public static void DeleteCachedAchRejectionTransaction(AchTransaction achRejection)
        {
            int achId = achRejection.AchId;

            if (_transactions == null || _transactions.Count == 0)
            {
                GetCachedTransactions();
            }

            for (int i = 0; i < _transactions.Count; i++)
            {
                if (_transactions[i].AchId == achId)
                {
                    _transactions[i].Status = AchStatus.Rejected;
                    _transactions[i].IsDeletedRejection = null;
                    _transactions[i].TransactionDate = DateTime.Now;
                    _transactions[i].RejectionReasonId = achRejection.RejectionReasonId;
                    _transactions[i].OtherNote = achRejection.OtherNote;
                    break;
                }
            }
        }

        public static void UpdateCachedAchToRemoveRejection(int achId)
        {
            if (_transactions == null || _transactions.Count == 0)
            {
                GetCachedTransactions();
            }

            for (int i = 0; i < _transactions.Count; i++)
            {
                if (_transactions[i].AchId == achId && _transactions[i].Status == AchStatus.Rejected)
                {
                    _transactions[i].Status = AchStatus.Active;
                    _transactions[i].TransactionDate = DateTime.Now;
                    _transactions[i].RejectionReasonId = 0;
                    _transactions[i].OtherNote = null;
                    _transactions[i].IsDeletedRejection = true;
                    break;
                }
            }
        }

        public static void InsertCachedAchTransaction(AchTransaction AchTransaction)
        {
            if (_transactions == null || _transactions.Count == 0)
            {
                GetCachedTransactions();
            }

            if (AchTransaction != null)
            {
                _transactions?.Add(AchTransaction);
            }
        }

        public static List<AchApprover> GetAchApprovers()
        {
            //TODO: Add Core call to get this data
            var achApproversList = new List<AchApprover>
            {
                new AchApprover
                {
                    AchApproverId = 1,
                    Name = "Suzy Peters"
                },
                new AchApprover
                {
                    AchApproverId = 2,
                    Name = "Tracie Hadcock"
                }

            };

            return achApproversList;
        }

        public static int CreateAchTransaction(AchTransaction AchTransaction)
        {
            if (_transactions == null || _transactions.Count == 0)
            {
                GetCachedTransactions();
            }
            var maxAchid = _transactions.Max(x => x.AchId);

            AchTransaction.AchId = maxAchid + 1;
            _transactions.Add(AchTransaction);

            return AchTransaction.AchId;
        }

        
    }
}
