using FCSAmerica.Transact.Client.Common;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.Common.Contracts;
using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceAgents.Common;
using FCSAmerica.Transact.ServiceModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DayOfWeek = FCSAmerica.Transact.Common.Contracts.DayOfWeek;

namespace ClientBusinessLogic.Tests
{
    [TestClass]
    public class SchedulerMappingHelperTests
    {
        [TestMethod]
        public void GivenWeeklySchedule_WhenMapScheduleFromServiceCalled_ThenReturnPaymentSchedule()
        {
            var testData = AchTestModelFactory.CreateTransactionTemplateServiceModelWithWeeklySchedule();

            var result = SchedulerMappingHelper.MapScheduleFromServiceTransactionTemplate(testData);

            Assert.AreEqual(Constants.ScheduleFrequencyRecurring, result.Frequency);
            Assert.AreEqual(Constants.RecurringFrequencyWeekly, result.RecurringSchedule.Frequency);
            Assert.IsTrue(result.RecurringSchedule.WeeklySchedule.RecurBy.All(_ => _.DayOfTheWeekNumber == 4));
            Assert.IsFalse(result.RecurringSchedule.WeeklySchedule.PayEveryWeek);
            Assert.AreEqual(testData.StartDate, result.RecurringSchedule.WeeklySchedule.StartDate);
            Assert.AreEqual(testData.EndDate, result.RecurringSchedule.WeeklySchedule.EndDate);
            Assert.AreEqual(testData.EndAfterNPayments, result.RecurringSchedule.WeeklySchedule.EndPaymentsAfterNWeeks);
            Assert.AreEqual(testData.PaymentsEveryNPeriods, result.RecurringSchedule.WeeklySchedule.PayEveryNWeeks);
        }

        [TestMethod]
        public void GivenMonthlyCalendarDaysSchedule_WhenMapScheduleFromServiceCalled_ThenReturnPaymentSchedule()
        {
            var testData = AchTestModelFactory.CreateTransactionTemplateServiceModelWithMonthlyCalendarDaysSchedule();

            var result = SchedulerMappingHelper.MapScheduleFromServiceTransactionTemplate(testData);

            Assert.AreEqual(Constants.ScheduleFrequencyRecurring, result.Frequency);
            Assert.AreEqual(Constants.RecurringFrequencyMonthly, result.RecurringSchedule.Frequency);
            Assert.AreEqual(Constants.MonthlyRecurCalendarDay, result.RecurringSchedule.MonthlySchedule.RecurBy);
            Assert.IsTrue(result.RecurringSchedule.MonthlySchedule.CalendarDays.All(_ => _ == 15));
            Assert.IsFalse(result.RecurringSchedule.MonthlySchedule.PayEveryMonth);
            Assert.AreEqual(testData.StartDate, result.RecurringSchedule.MonthlySchedule.StartDate);
            Assert.AreEqual(testData.EndDate, result.RecurringSchedule.MonthlySchedule.EndDate);
            Assert.AreEqual(testData.EndAfterNPayments, result.RecurringSchedule.MonthlySchedule.EndPaymentsAfterNMonths);
            Assert.AreEqual(testData.PaymentsEveryNPeriods, result.RecurringSchedule.MonthlySchedule.PayEveryNMonths);
        }

        [TestMethod]
        public void GivenMonthlyDaysOfWeekSchedule_WhenMapScheduleFromServiceCalled_ThenReturnPaymentSchedule()
        {
            var testData = AchTestModelFactory.CreateTransactionTemplateServiceModelWithMonthlyDaysOfWeekSchedule();

            var result = SchedulerMappingHelper.MapScheduleFromServiceTransactionTemplate(testData);

            Assert.AreEqual(Constants.ScheduleFrequencyRecurring, result.Frequency);
            Assert.AreEqual(Constants.RecurringFrequencyMonthly, result.RecurringSchedule.Frequency);
            Assert.AreEqual(Constants.MonthlyRecurDaysOfTheWeek, result.RecurringSchedule.MonthlySchedule.RecurBy);
            Assert.IsTrue(result.RecurringSchedule.MonthlySchedule.DaysOfTheWeek.PayOnIndex.All(_ => _ == 3));
            Assert.AreEqual((int)testData.DaysOfWeek.First(), result.RecurringSchedule.MonthlySchedule.DaysOfTheWeek.PayOnWeekday.DayOfTheWeekNumber);
            Assert.IsFalse(result.RecurringSchedule.MonthlySchedule.PayEveryMonth);
            Assert.AreEqual(testData.StartDate, result.RecurringSchedule.MonthlySchedule.StartDate);
            Assert.AreEqual(testData.EndDate, result.RecurringSchedule.MonthlySchedule.EndDate);
            Assert.AreEqual(testData.EndAfterNPayments, result.RecurringSchedule.MonthlySchedule.EndPaymentsAfterNMonths);
            Assert.AreEqual(testData.PaymentsEveryNPeriods, result.RecurringSchedule.MonthlySchedule.PayEveryNMonths);
        }

        [TestMethod]
        public void GivenWeeklySchedule_WhenMapPaymentScheduleToServiceTransactionTemplate_ThenPopulateSchedule()
        {
            var testData = AchTestModelFactory.CreateWeeklyPaymentSchedule();
            var transactionTemplate = new TransactionTemplateServiceModel();
            transactionTemplate.ScheduleType = ScheduleType.Weekly;

            SchedulerMappingHelper.MapPaymentScheduleToServiceTransactionTemplate(testData, transactionTemplate);

            Assert.IsTrue(transactionTemplate.DaysOfWeek.All(_ => _.ToString() == "Monday"));
            Assert.AreEqual(testData.RecurringSchedule.WeeklySchedule.PayEveryNWeeks,
                transactionTemplate.PaymentsEveryNPeriods);
            Assert.AreEqual(testData.RecurringSchedule.WeeklySchedule.EndPaymentsAfterNWeeks,
                transactionTemplate.EndAfterNPayments);
            Assert.AreEqual(testData.RecurringSchedule.WeeklySchedule.StartDate, transactionTemplate.StartDate);
            Assert.AreEqual(testData.RecurringSchedule.WeeklySchedule.EndDate, transactionTemplate.EndDate);
        }

        [TestMethod]
        public void GivenMonthlyScheduleCalendarDays_WhenMapPaymentScheduleToServiceTransactionTemplate_ThenPopulateCommonMonthlyScheduleFields()
        {
            var testData = AchTestModelFactory.CreateMonthlyCalendarDaysPaymentSchedule();
            var transactionTemplate = new TransactionTemplateServiceModel();
            transactionTemplate.ScheduleType = ScheduleType.MonthlyCalendarDays;

            SchedulerMappingHelper.MapPaymentScheduleToServiceTransactionTemplate(testData, transactionTemplate);

            Assert.IsTrue(transactionTemplate.DaysOfMonth.Contains(DayOfMonth.First));
            Assert.IsTrue(transactionTemplate.DaysOfMonth.Contains(DayOfMonth.Fifteenth));
            Assert.AreEqual(testData.RecurringSchedule.MonthlySchedule.PayEveryNMonths, transactionTemplate.PaymentsEveryNPeriods);
            Assert.AreEqual(testData.RecurringSchedule.MonthlySchedule.EndPaymentsAfterNMonths, transactionTemplate.EndAfterNPayments);
            Assert.AreEqual(testData.RecurringSchedule.MonthlySchedule.StartDate, transactionTemplate.StartDate);
            Assert.AreEqual(testData.RecurringSchedule.MonthlySchedule.EndDate, transactionTemplate.EndDate);
        }

        [TestMethod]
        public void GivenMonthlyScheduleDaysOfTheWeek_WhenMapPaymentScheduleToServiceTransactionTemplate_ThenPopulateCommonMonthlyScheduleFields()
        {
            var testData = AchTestModelFactory.CreateMonthlyDaysOfWeekPaymentSchedule();
            var transactionTemplate = new TransactionTemplateServiceModel();
            transactionTemplate.ScheduleType = ScheduleType.MonthlyDaysOfWeek;

            SchedulerMappingHelper.MapPaymentScheduleToServiceTransactionTemplate(testData, transactionTemplate);

            Assert.IsTrue(transactionTemplate.DaysOfWeek.Contains(DayOfWeek.Monday));
            Assert.IsTrue(transactionTemplate.WeeksOfMonth.Contains(WeekOfMonth.First));
            Assert.IsTrue(transactionTemplate.WeeksOfMonth.Contains(WeekOfMonth.Third));
            Assert.AreEqual(testData.RecurringSchedule.MonthlySchedule.PayEveryNMonths, transactionTemplate.PaymentsEveryNPeriods);
            Assert.AreEqual(testData.RecurringSchedule.MonthlySchedule.EndPaymentsAfterNMonths, transactionTemplate.EndAfterNPayments);
            Assert.AreEqual(testData.RecurringSchedule.MonthlySchedule.StartDate, transactionTemplate.StartDate);
            Assert.AreEqual(testData.RecurringSchedule.MonthlySchedule.EndDate, transactionTemplate.EndDate);
        }

        [TestMethod]
        public void GivenWeeklySchedule_WhenGetCoreScheduleTypeFromFrequencyCalled_ThenReturnWeeklyScheduleType()
        {
            var paymentSchedule = new PaymentSchedule
            {
                Frequency = Constants.ScheduleFrequencyRecurring,
                RecurringSchedule = new RecurringPayment
                {
                    Frequency = Constants.RecurringFrequencyWeekly
                }
            };

            var result = SchedulerMappingHelper.GetCoreScheduleTypeFromFrequency(paymentSchedule);

            Assert.IsTrue(result == ScheduleType.Weekly);
        }

        [TestMethod]
        public void GivenMonthlyCalendarDaysSchedule_WhenGetCoreScheduleTypeFromFrequencyCalled_ThenReturnMonthlyCalendarDaysScheduleType()
        {
            var paymentSchedule = new PaymentSchedule
            {
                Frequency = Constants.ScheduleFrequencyRecurring,
                RecurringSchedule = new RecurringPayment
                {
                    Frequency = Constants.RecurringFrequencyMonthly,
                    MonthlySchedule = new MonthlySchedule
                    {
                        RecurBy = Constants.MonthlyRecurCalendarDay
                    }
                }
            };

            var result = SchedulerMappingHelper.GetCoreScheduleTypeFromFrequency(paymentSchedule);

            Assert.IsTrue(result == ScheduleType.MonthlyCalendarDays);
        }

        [TestMethod]
        public void GivenMonthlyDaysOfWeekSchedule_WhenGetCoreScheduleTypeFromFrequencyCalled_ThenReturnMonthlyDaysOfWeekScheduleType()
        {
            var paymentSchedule = new PaymentSchedule
            {
                Frequency = Constants.ScheduleFrequencyRecurring,
                RecurringSchedule = new RecurringPayment
                {
                    Frequency = Constants.RecurringFrequencyMonthly,
                    MonthlySchedule = new MonthlySchedule
                    {
                        RecurBy = Constants.MonthlyRecurDaysOfTheWeek
                    }
                }
            };

            var result = SchedulerMappingHelper.GetCoreScheduleTypeFromFrequency(paymentSchedule);

            Assert.IsTrue(result == ScheduleType.MonthlyDaysOfWeek);
        }
    }
}
