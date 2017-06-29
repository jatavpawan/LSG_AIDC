using FCSAmerica.Transact.Client.Common;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.Common.Contracts;
using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceModels;
using System;
using System.Linq;
using DayOfWeek = FCSAmerica.Transact.Common.Contracts.DayOfWeek;

namespace FCSAmerica.Transact.ServiceAgents.Common
{
    public static class SchedulerMappingHelper
    {
        public static void MapPaymentScheduleToServiceTransactionTemplate(PaymentSchedule paymentSchedule, TransactionTemplateServiceModel serviceTransactionTemplate)
        {
            if (serviceTransactionTemplate.ScheduleType == ScheduleType.OneTime)
            {
                serviceTransactionTemplate.StartDate = paymentSchedule.OneTimePaymentDate;
            }
            else if (serviceTransactionTemplate.ScheduleType == ScheduleType.Quarterly)
            {
                serviceTransactionTemplate.EndAfterNPayments = paymentSchedule.RecurringSchedule.QuarterlySchedule.EndAfterNPayments;
                serviceTransactionTemplate.StartDate = paymentSchedule.RecurringSchedule.QuarterlySchedule.StartDate;
                serviceTransactionTemplate.EndDate = paymentSchedule.RecurringSchedule.QuarterlySchedule.EndDate;
            }
            else if (serviceTransactionTemplate.ScheduleType == ScheduleType.Annual)
            {
                serviceTransactionTemplate.EndAfterNPayments = paymentSchedule.RecurringSchedule.AnnualSchedule.EndAfterNPayments;
                serviceTransactionTemplate.StartDate = paymentSchedule.RecurringSchedule.AnnualSchedule.StartDate;
                serviceTransactionTemplate.EndDate = paymentSchedule.RecurringSchedule.AnnualSchedule.EndDate;
            }
            else if (serviceTransactionTemplate.ScheduleType == ScheduleType.Weekly)
            {
                serviceTransactionTemplate.DaysOfWeek = paymentSchedule.RecurringSchedule.WeeklySchedule.RecurBy.Select(p => (DayOfWeek)p.DayOfTheWeekNumber).ToArray();
                serviceTransactionTemplate.PaymentsEveryNPeriods = paymentSchedule.RecurringSchedule.WeeklySchedule.PayEveryNWeeks;
                serviceTransactionTemplate.EndAfterNPayments = paymentSchedule.RecurringSchedule.WeeklySchedule.EndPaymentsAfterNWeeks;
                serviceTransactionTemplate.EndDate = paymentSchedule.RecurringSchedule.WeeklySchedule.EndDate;
                serviceTransactionTemplate.StartDate = paymentSchedule.RecurringSchedule.WeeklySchedule.StartDate;
            }
            else
            {
                if (serviceTransactionTemplate.ScheduleType == ScheduleType.MonthlyCalendarDays)
                {
                    serviceTransactionTemplate.DaysOfMonth = paymentSchedule.RecurringSchedule.MonthlySchedule.CalendarDays.Select(c => (DayOfMonth)c).ToArray();
                }
                else if (serviceTransactionTemplate.ScheduleType == ScheduleType.MonthlyDaysOfWeek)
                {
                    serviceTransactionTemplate.WeeksOfMonth = paymentSchedule.RecurringSchedule.MonthlySchedule.DaysOfTheWeek.PayOnIndex.Select(p => (WeekOfMonth)p).ToArray();
                    serviceTransactionTemplate.DaysOfWeek = new[]
                    {
                        (DayOfWeek) paymentSchedule.RecurringSchedule.MonthlySchedule.DaysOfTheWeek.PayOnWeekday.DayOfTheWeekNumber
                    };
                }
                serviceTransactionTemplate.PaymentsEveryNPeriods = paymentSchedule.RecurringSchedule.MonthlySchedule.PayEveryNMonths;
                serviceTransactionTemplate.EndAfterNPayments = paymentSchedule.RecurringSchedule.MonthlySchedule.EndPaymentsAfterNMonths;
                serviceTransactionTemplate.EndDate = paymentSchedule.RecurringSchedule.MonthlySchedule.EndDate;
                serviceTransactionTemplate.StartDate = paymentSchedule.RecurringSchedule.MonthlySchedule.StartDate;
            }
        }

        public static void MapPaymentScheduleToServiceTransferTemplate(PaymentSchedule paymentSchedule, InternalTransferTransactionTemplateServiceModel serviceTransactionTemplate)
        {
            if (serviceTransactionTemplate.ScheduleType == ScheduleType.OneTime)
            {
                serviceTransactionTemplate.StartDate = paymentSchedule.OneTimePaymentDate;
            }
            else if (serviceTransactionTemplate.ScheduleType == ScheduleType.Quarterly)
            {
                serviceTransactionTemplate.EndAfterNPayments = paymentSchedule.RecurringSchedule.QuarterlySchedule.EndAfterNPayments;
                serviceTransactionTemplate.StartDate = paymentSchedule.RecurringSchedule.QuarterlySchedule.StartDate;
                serviceTransactionTemplate.EndDate = paymentSchedule.RecurringSchedule.QuarterlySchedule.EndDate;
            }
            else if (serviceTransactionTemplate.ScheduleType == ScheduleType.Annual)
            {
                serviceTransactionTemplate.EndAfterNPayments = paymentSchedule.RecurringSchedule.AnnualSchedule.EndAfterNPayments;
                serviceTransactionTemplate.StartDate = paymentSchedule.RecurringSchedule.AnnualSchedule.StartDate;
                serviceTransactionTemplate.EndDate = paymentSchedule.RecurringSchedule.AnnualSchedule.EndDate;
            }
            else if (serviceTransactionTemplate.ScheduleType == ScheduleType.Weekly)
            {
                serviceTransactionTemplate.DaysOfWeek = paymentSchedule.RecurringSchedule.WeeklySchedule.RecurBy.Select(p => (DayOfWeek)p.DayOfTheWeekNumber).ToArray();
                serviceTransactionTemplate.PaymentsEveryNPeriods = paymentSchedule.RecurringSchedule.WeeklySchedule.PayEveryNWeeks;
                serviceTransactionTemplate.EndAfterNPayments = paymentSchedule.RecurringSchedule.WeeklySchedule.EndPaymentsAfterNWeeks;
                serviceTransactionTemplate.EndDate = paymentSchedule.RecurringSchedule.WeeklySchedule.EndDate;
                serviceTransactionTemplate.StartDate = paymentSchedule.RecurringSchedule.WeeklySchedule.StartDate;
            }
            else
            {
                if (serviceTransactionTemplate.ScheduleType == ScheduleType.MonthlyCalendarDays)
                {
                    serviceTransactionTemplate.DaysOfMonth = paymentSchedule.RecurringSchedule.MonthlySchedule.CalendarDays.Select(c => (DayOfMonth)c).ToArray();
                }
                else if (serviceTransactionTemplate.ScheduleType == ScheduleType.MonthlyDaysOfWeek)
                {
                    serviceTransactionTemplate.WeeksOfMonth = paymentSchedule.RecurringSchedule.MonthlySchedule.DaysOfTheWeek.PayOnIndex.Select(p => (WeekOfMonth)p).ToArray();
                    serviceTransactionTemplate.DaysOfWeek = new[]
                    {
                        (DayOfWeek) paymentSchedule.RecurringSchedule.MonthlySchedule.DaysOfTheWeek.PayOnWeekday.DayOfTheWeekNumber
                    };
                }
                serviceTransactionTemplate.PaymentsEveryNPeriods = paymentSchedule.RecurringSchedule.MonthlySchedule.PayEveryNMonths;
                serviceTransactionTemplate.EndAfterNPayments = paymentSchedule.RecurringSchedule.MonthlySchedule.EndPaymentsAfterNMonths;
                serviceTransactionTemplate.EndDate = paymentSchedule.RecurringSchedule.MonthlySchedule.EndDate;
                serviceTransactionTemplate.StartDate = paymentSchedule.RecurringSchedule.MonthlySchedule.StartDate;
            }
        }

        public static PaymentSchedule MapScheduleFromServiceTransferTemplate(InternalTransferTransactionTemplateServiceModel internalTransferTransactionServiceModel)
        {
            var serviceScheduleModel = new ServiceScheduleModel
            {
                ScheduleType = internalTransferTransactionServiceModel.ScheduleType,
                FirstPaymentDate = internalTransferTransactionServiceModel.StartDate,
                EndPaymentDate = internalTransferTransactionServiceModel.EndDate,
                EndAfterNPayments = internalTransferTransactionServiceModel.EndAfterNPayments,
                PaymentsEveryNPeriods = internalTransferTransactionServiceModel.PaymentsEveryNPeriods,
                DaysOfMonth = internalTransferTransactionServiceModel.DaysOfMonth,
                WeeksOfMonth = internalTransferTransactionServiceModel.WeeksOfMonth,
                DaysOfWeek = internalTransferTransactionServiceModel.DaysOfWeek
            };

            return MapScheduleFromService(serviceScheduleModel);
        }

        public static PaymentSchedule MapScheduleFromServiceTransactionTemplate(TransactionTemplateServiceModel serviceTransactionTemplate)
        {
            var serviceScheduleModel = new ServiceScheduleModel
            {
                ScheduleType = serviceTransactionTemplate.ScheduleType ?? ScheduleType.OneTime,
                FirstPaymentDate = serviceTransactionTemplate.StartDate,
                EndPaymentDate = serviceTransactionTemplate.EndDate,
                EndAfterNPayments = serviceTransactionTemplate.EndAfterNPayments,
                PaymentsEveryNPeriods = serviceTransactionTemplate.PaymentsEveryNPeriods,
                DaysOfMonth = serviceTransactionTemplate.DaysOfMonth,
                WeeksOfMonth = serviceTransactionTemplate.WeeksOfMonth,
                DaysOfWeek = serviceTransactionTemplate.DaysOfWeek
            };

            return MapScheduleFromService(serviceScheduleModel);
        }

        private static PaymentSchedule MapScheduleFromService(ServiceScheduleModel serviceScheduleModel)
        {
            var paymentSchedule = new PaymentSchedule
            {
                Frequency = GetScheduleFrequency(serviceScheduleModel.ScheduleType),
                OneTimePaymentDate = serviceScheduleModel.ScheduleType == ScheduleType.OneTime ? serviceScheduleModel.FirstPaymentDate : (DateTime?)null,
                RecurringSchedule = new RecurringPayment
                {
                    Frequency = GetRecurringFrequency(serviceScheduleModel.ScheduleType),
                    MonthlySchedule = GetMonthlySchedule(serviceScheduleModel),
                    WeeklySchedule = GetWeeklySchedule(serviceScheduleModel),
                    QuarterlySchedule = GetQuarterlySchedule(serviceScheduleModel),
                    AnnualSchedule = GetAnnualSchedule(serviceScheduleModel)
                },
                FirstPaymentDate = serviceScheduleModel.FirstPaymentDate,
                EndPaymentDate = serviceScheduleModel.EndPaymentDate
            };

            return paymentSchedule;
        }

        private static AnnualSchedule GetAnnualSchedule(ServiceScheduleModel serviceScheduleModel)
        {
            if (serviceScheduleModel.ScheduleType == ScheduleType.Annual)
            {
                return new AnnualSchedule()
                {
                    EndAfterNPayments = serviceScheduleModel.EndAfterNPayments,
                    EndDate = serviceScheduleModel.EndPaymentDate,
                    HasEndDate = serviceScheduleModel.EndPaymentDate.HasValue || serviceScheduleModel.EndAfterNPayments.GetValueOrDefault() > 0,
                    StartDate = serviceScheduleModel.FirstPaymentDate
                };
            }
            return null;
        }

        private static QuarterlySchedule GetQuarterlySchedule(ServiceScheduleModel serviceScheduleModel)
        {
            if (serviceScheduleModel.ScheduleType == ScheduleType.Quarterly)
            {
                return new QuarterlySchedule
                {
                    EndAfterNPayments = serviceScheduleModel.EndAfterNPayments,
                    EndDate = serviceScheduleModel.EndPaymentDate,
                    HasEndDate = serviceScheduleModel.EndPaymentDate.HasValue || serviceScheduleModel.EndAfterNPayments.GetValueOrDefault() > 0,
                    StartDate = serviceScheduleModel.FirstPaymentDate
                };
            }
            return null;
        }

        private static WeeklySchedule GetWeeklySchedule(ServiceScheduleModel serviceScheduleModel)
        {
            if (serviceScheduleModel.ScheduleType == ScheduleType.Weekly)
            {
                return new WeeklySchedule
                {
                    StartDate = serviceScheduleModel.FirstPaymentDate,
                    EndDate = serviceScheduleModel.EndPaymentDate,
                    EndPaymentsAfterNWeeks = serviceScheduleModel.EndAfterNPayments,
                    HasEndDate = serviceScheduleModel.EndPaymentDate.HasValue || serviceScheduleModel.EndAfterNPayments.GetValueOrDefault() > 0,
                    PayEveryWeek = serviceScheduleModel.PaymentsEveryNPeriods == null || serviceScheduleModel.PaymentsEveryNPeriods == 1,
                    PayEveryNWeeks = serviceScheduleModel.PaymentsEveryNPeriods,
                    RecurBy = serviceScheduleModel.DaysOfWeek
                        .Select(x => new WeekDay { DayOfTheWeekNumber = (int)x, DayOfTheWeekString = x.ToString() })
                        .ToArray()
                };
            }
            return null;
        }

        private static MonthlySchedule GetMonthlySchedule(ServiceScheduleModel serviceScheduleModel)
        {
            var monthlySchedule = new MonthlySchedule
            {
                StartDate = serviceScheduleModel.FirstPaymentDate,
                EndDate = serviceScheduleModel.EndPaymentDate,
                EndPaymentsAfterNMonths = serviceScheduleModel.EndAfterNPayments,
                HasEndDate = serviceScheduleModel.EndPaymentDate.HasValue || serviceScheduleModel.EndAfterNPayments.GetValueOrDefault() > 0,
                PayEveryMonth = serviceScheduleModel.PaymentsEveryNPeriods == null || serviceScheduleModel.PaymentsEveryNPeriods == 1,
                PayEveryNMonths = serviceScheduleModel.PaymentsEveryNPeriods,
            };

            if (serviceScheduleModel.ScheduleType == ScheduleType.MonthlyCalendarDays)
            {
                monthlySchedule.CalendarDays = serviceScheduleModel.DaysOfMonth.Select(x => (int)x).ToArray();
                monthlySchedule.RecurBy = Constants.MonthlyRecurCalendarDay;

            }
            else if (serviceScheduleModel.ScheduleType == ScheduleType.MonthlyDaysOfWeek)
            {
                monthlySchedule.DaysOfTheWeek = new DaysOfTheWeek
                {
                    PayOnIndex = serviceScheduleModel.WeeksOfMonth.Select(x => (int)x).ToArray(),
                    PayOnWeekday = new WeekDay
                    {
                        DayOfTheWeekNumber = serviceScheduleModel.DaysOfWeek.Any() ? (int)serviceScheduleModel.DaysOfWeek.First() : 1,
                        DayOfTheWeekString = serviceScheduleModel.DaysOfWeek.Any() ? serviceScheduleModel.DaysOfWeek.First().ToString() : ""
                    }
                };
                monthlySchedule.RecurBy = Constants.MonthlyRecurDaysOfTheWeek;
            }
            else
            {
                return null;
            }

            return monthlySchedule;
        }

        private static string GetRecurringFrequency(ScheduleType? scheduleType)
        {
            var recurringFrequency = string.Empty;

            if (scheduleType.HasValue)
            {

                if (scheduleType == ScheduleType.Weekly)
                {
                    recurringFrequency = Constants.RecurringFrequencyWeekly;
                }
                else if (scheduleType == ScheduleType.MonthlyDaysOfWeek ||
                         scheduleType == ScheduleType.MonthlyCalendarDays)
                {
                    recurringFrequency = Constants.RecurringFrequencyMonthly;
                }
                else if (scheduleType == ScheduleType.Annual)
                {
                    recurringFrequency = Constants.AnnualFrequency;
                }
                else if (scheduleType == ScheduleType.Quarterly)
                {
                    recurringFrequency = Constants.QuarterlyFrequency;
                }
            }

            return recurringFrequency;
        }

        private static string GetScheduleFrequency(ScheduleType? scheduleType)
        {
            var frequency = string.Empty;

            if (scheduleType.HasValue)
            {
                if (scheduleType.Value == ScheduleType.OneTime)
                {
                    frequency = "once";
                }
                else if (scheduleType.Value != ScheduleType.OneTime)
                {
                    frequency = "recurring";
                }
            }

            return frequency;
        }

        public static ScheduleType GetCoreScheduleTypeFromFrequency(PaymentSchedule schedule)
        {
            if (schedule.Frequency == Constants.ScheduleFrequencyOnce)
            {
                return ScheduleType.OneTime;
            }

            if (schedule.RecurringSchedule.Frequency == Constants.AnnualFrequency)
            {
                return ScheduleType.Annual;
            }

            if (schedule.RecurringSchedule.Frequency == Constants.QuarterlyFrequency)
            {
                return ScheduleType.Quarterly;
            }

            if (schedule.RecurringSchedule.Frequency == Constants.RecurringFrequencyWeekly)
            {
                return ScheduleType.Weekly;
            }

            if (schedule.RecurringSchedule.MonthlySchedule.RecurBy == Constants.MonthlyRecurCalendarDay)
            {
                return ScheduleType.MonthlyCalendarDays;
            }

            return ScheduleType.MonthlyDaysOfWeek;
        }
    }
}
