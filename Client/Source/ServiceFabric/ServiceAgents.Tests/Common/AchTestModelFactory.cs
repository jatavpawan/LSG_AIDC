using FCSAmerica.Transact.Client.Common;
using FCSAmerica.Transact.Client.Common.enums;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.Client.Models.Ach;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.Common.Contracts;
using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceModels;
using System;
using DayOfWeek = FCSAmerica.Transact.Common.Contracts.DayOfWeek;

namespace FCSAmerica.Transact.ServiceAgents.Common
{
    public class AchTestModelFactory
    {
        public static DateTime GetCurrentDate()
        {
            return DateTime.Parse("04/28/2017");
        }

        public static AchRejectionServiceModel CreateFakeAchRejectionServiceModel()
        {
            var result = new AchRejectionServiceModel
            {
                AchId = 1,
                Description = "OtherNote",
                IsFormComplete = false,
                RejectReason = RejectReason.R01
            };

            return result;
        }

        public static AchTransaction CreateFakeAchRejection()
        {
            var result = new AchTransaction()
            {
                AchId = 1,
                Amount = 2.0m,
                CompanyName = "Company",
                ExternalAccountNumber = "123",
                Form2269 = false,
                OlderThan24Hours = false,
                OtherNote = "OtherNote",
                RejectionReasonId = (int)RejectReason.R01,
                TransactionDate = GetCurrentDate(),
                TransactionDirection = new GenericEnumMap() { Id = 1, Description = "In" }
            };

            return result;
        }

        public static BankTemplateServiceModel CreateFakeBankTemplateServiceModel()
        {
            var result = new BankTemplateServiceModel()
            {
                BankTemplateId = 1,
                AbaRoutingNumber = "12345",
                BankAccountTypeId = 1,
                IsActive = true,
                CustomerId = 1,
                ExternalAccountNumber = "122132131",
                CreatedOn = DateTime.Now.ToShortDateString(),
                UpdatedOn = DateTime.Now.ToShortDateString(),
                CreatedBy = "CreatedBy",
                UpdatedBy = "UpdatedBy"
            };

            return result;
        }

        public static BankTemplate CreateFakeBankTemplate()
        {
            var result = new BankTemplate
            {
                BankTemplateId = 1,
                AbaRoutingNumber = "12345",
                AuditInfo = CreateFakeAuditInfo(),
                BankAccountType = CreateFakeBankAccountType(),
                BankName = "Test Bank 1",
                City = "Test City 1",
                CustomerId = 1,
                ExternalAccountNumber = "122132131",
                IsActive = true,
                State = "Test State 1",
                VerbalIdentifier = null
            };

            return result;
        }

        public static AuditInfo CreateFakeAuditInfo()
        {
            return new AuditInfo
            {
                CreatedOn = GetCurrentDate(),
                UpdatedOn = GetCurrentDate(),
                CreatedBy = "CreatedBy",
                UpdatedBy = "UpdatedBy",
                DeletedBy = "DeletedBy",
                DeletedOn = GetCurrentDate()
            };
        }

        public static AbaBankInfoServiceModel CreateFakeAbaBankInfoServiceModel()
        {
            var result = new AbaBankInfoServiceModel
            {
                BankName = "Test Bank 1",
                Address = "Test Address 1",
                City = "Test City 1",
                State = "Test State 1",
                AbaRoutingNumber = "1234",
                AreaCode = "402",
                NewRoutingNumber = "1234",
                PostalCode = "68116",
                PostalCodePlus4 = "4324324",
                Prefix = "P",
                Suffix = "S"
            };

            return result;
        }

        public static BankAccountTypeServiceModel CreateFakeBankAccountTypeServiceModel()
        {
            var result = new BankAccountTypeServiceModel
            {
                BankAccountTypeId = 1,
                Name = "Checking"
            };

            return result;
        }

        public static GenericEnumMap CreateFakeBankAccountType()
        {
            var result = new GenericEnumMap()
            {
                Id = 1,
                Description = "Checking"
            };

            return result;
        }

        public static Aba CreateFakeAba()
        {
            var result = new Aba()
            {
                City = "Test City 1",
                State = "Test State 1",
                AbaNumber = "1234",
                Name = "Test Bank 1",
            };

            return result;
        }

        public static AchTransaction CreateFakeAchTransaction()
        {
            var transaction = new AchTransaction
            {
                AchId = 1,
                Amount = 200.00m,
                TransactionDirection = new GenericEnumMap() { Id = 1, Description = "In" },
                Status = AchStatus.Active,
                TransactionDate = DateTime.Now
            };

            return transaction;
        }

        public static AchApproverServiceModel CreateFakeAchApproverServiceModel()
        {
            return new AchApproverServiceModel
            {
                ApproverId = 1,
                Name = "ApproverName"
            };
        }

        public static AchRejectReasonCodeServiceModel CreateAchRejectReasonCodeServiceModel()
        {
            return new AchRejectReasonCodeServiceModel
            {
                AchRejectReasonId = 1,
                Description = "Description",
                IsActive = true,
                TransactionTypeId = 1
            };
        }

        public static TransactionTemplate CreateTransactionTemplate()
        {
            return new TransactionTemplate
            {
                AchId = 1,
                CustomerId = 1,
                AchApprover = new AchApprover { AchApproverId = 1 },
                Addenda = "test addenda",
                Amount = 1,
                ExcessAmount = 1,
                AuditInfo = new AuditInfo
                {
                    CreatedBy = "test createdby",
                },
                HowToApply = new GenericEnumMap()
                {
                    Id = 1,
                    Description = "Interest Payment"
                },
                Account = new Account
                {
                    AccountNumber = 1,
                    //TODO: Map this to the correct field when available from Core
                    Purpose = "General"
                },
                Nickname = "test nickname",
                Status = AchStatus.Active,
                TransactionDate = new DateTime(2017, 01, 01),
                BankTemplate = new BankTemplate { BankTemplateId = 1, BankName = "test bank name" },
                TransactionDirection = new GenericEnumMap() { Id = 1, Description = "In" },
                Schedule = new PaymentSchedule { Frequency = "once", OneTimePaymentDate = new DateTime(2017, 01, 01) },
                AuthorizationType = AuthorizationType.Form2140
            };
        }

        public static TransactionTemplateServiceModel CreateTransactionTemplateServiceModel()
        {
            return new TransactionTemplateServiceModel
            {
                TransactionTemplateId = 1,
                ApproverEmployeeId = 1,
                Addenda = "test addenda",
                Amount = 1,
                ExcessAmount = 1,
                TransactionType = Transact.Common.Constants.TransactionType.PrincipalPayment,
                TransactionDirection = TransactionDirection.In,
                NickName = "test nickname",
                IsActive = true,
                ScheduleType = ScheduleType.OneTime,
                StartDate = new DateTime(2017, 01, 01),
                BankTemplateId = 1,
                BankName = "test bank",
                ExternalAccountNumber = "1",
                BankAccountType = Transact.Common.LocalConstants.BankAccountType.Checking
            };
        }

        public static PaymentSchedule CreateOneTimePaymentSchedule()
        {
            return new PaymentSchedule
            {
                Frequency = "once",
                OneTimePaymentDate = new DateTime(2017, 01, 01)
            };
        }

        public static PaymentSchedule CreateWeeklyPaymentSchedule()
        {
            return new PaymentSchedule
            {
                Frequency = Constants.RecurringFrequencyWeekly,
                RecurringSchedule = new RecurringPayment
                {
                    WeeklySchedule = new WeeklySchedule
                    {
                        RecurBy = new WeekDay[]
                        {
                            new WeekDay
                            {
                                DayOfTheWeekNumber = 2
                            }
                        },
                        StartDate = new DateTime(2017, 1, 1),
                        PayEveryNWeeks = 2,
                        EndPaymentsAfterNWeeks = 4,
                        EndDate = new DateTime(2017, 12, 31),
                        PayEveryWeek = false,
                        HasEndDate = true
                    },
                    Frequency = Constants.RecurringFrequencyWeekly
                }
            };
        }

        public static PaymentSchedule CreateMonthlyCalendarDaysPaymentSchedule()
        {
            return new PaymentSchedule
            {
                Frequency = Constants.RecurringFrequencyMonthly,
                RecurringSchedule = new RecurringPayment
                {
                    MonthlySchedule = new MonthlySchedule
                    {
                        RecurBy = Constants.MonthlyRecurCalendarDay,
                        CalendarDays = new[] { 1, 15 },
                        StartDate = new DateTime(2017, 1, 1),
                        PayEveryNMonths = 2,
                        EndPaymentsAfterNMonths = 4,
                        EndDate = new DateTime(2017, 12, 31)
                    },
                    Frequency = Constants.RecurringFrequencyMonthly
                }
            };
        }

        public static PaymentSchedule CreateMonthlyDaysOfWeekPaymentSchedule()
        {
            return new PaymentSchedule
            {
                Frequency = Constants.RecurringFrequencyMonthly,
                RecurringSchedule = new RecurringPayment
                {
                    MonthlySchedule = new MonthlySchedule
                    {
                        DaysOfTheWeek = new DaysOfTheWeek
                        {
                            PayOnIndex = new[] { 1, 3 },
                            PayOnWeekday = new WeekDay
                            {
                                DayOfTheWeekNumber = 2
                            }
                        },
                        RecurBy = Constants.MonthlyRecurDaysOfTheWeek,
                        StartDate = new DateTime(2017, 1, 1),
                        PayEveryNMonths = 2,
                        EndPaymentsAfterNMonths = 4,
                        EndDate = new DateTime(2017, 12, 31)
                    },
                    Frequency = Constants.RecurringFrequencyMonthly
                }
            };
        }

        public static TransactionTemplateServiceModel CreateTransactionTemplateServiceModelWithWeeklySchedule()
        {
            return new TransactionTemplateServiceModel
            {
                ScheduleType = ScheduleType.Weekly,
                StartDate = new DateTime(2017, 1, 1),
                EndDate = new DateTime(2017, 12, 31),
                EndAfterNPayments = 5,
                PaymentsEveryNPeriods = 3,
                DaysOfWeek = new[] { DayOfWeek.Wednesday }
            };
        }

        public static TransactionTemplateServiceModel CreateTransactionTemplateServiceModelWithMonthlyCalendarDaysSchedule()
        {
            return new TransactionTemplateServiceModel
            {
                ScheduleType = ScheduleType.MonthlyCalendarDays,
                StartDate = new DateTime(2017, 1, 1),
                EndDate = new DateTime(2017, 12, 31),
                EndAfterNPayments = 5,
                PaymentsEveryNPeriods = 3,
                DaysOfMonth = new[] { DayOfMonth.Fifteenth }
            };
        }

        public static TransactionTemplateServiceModel CreateTransactionTemplateServiceModelWithMonthlyDaysOfWeekSchedule()
        {
            return new TransactionTemplateServiceModel
            {
                ScheduleType = ScheduleType.MonthlyDaysOfWeek,
                StartDate = new DateTime(2017, 1, 1),
                EndDate = new DateTime(2017, 12, 31),
                EndAfterNPayments = 5,
                PaymentsEveryNPeriods = 3,
                DaysOfWeek = new[] { DayOfWeek.Wednesday },
                WeeksOfMonth = new[] { WeekOfMonth.Third }
            };
        }
    }
}
