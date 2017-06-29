using FCSAmerica.Transact.Client.Common;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.Client.Models.InternalTransfers;
using FCSAmerica.Transact.Common.Constants;
using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceModels;
using System.Collections.Generic;
using System.Linq;

namespace FCSAmerica.Transact.ServiceAgents.Common
{
    public class InternalTransferMappingHelper
    {
        public static ServiceModels.InternalTransferTransactionTemplateServiceModel MapInternalTransferTransactionTemplateClientModelToServiceModel(TransferTemplate template)
        {
            if (template == null)
            {
                return null;
            }

            var returnVal = new InternalTransferTransactionTemplateServiceModel()
            {
                Amount = template.Amount,
                FromAccountId = template.FromAccount.AccountId,
                FromCustomerId = template.FromCustomer.Id,
                ToAccountId = template.ToAccount.AccountId,
                ToCustomerId = template.ToCustomer.Id,
                ExcessAmount = template.ExcessAmount,
                ExcessAmountTransactionType =
                    template.ExcessAmount.HasValue
                        ? Transact.Common.Constants.TransactionType.PrincipalPayment
                        : (Transact.Common.Constants.TransactionType?)null,
                IsActive = true,
                IsForm2279Complete = template.IsForm2279Complete,
                Nickname = template.Nickname,
                TransactionType = (TransactionType?)template.HowToApply?.Id,
                OtherFeeCode = (FeeCode?)template.OtherFeeCode?.Id,
                ScheduleType = GetCoreScheduleTypeFromFrequency(template.Schedule),
            };

            SchedulerMappingHelper.MapPaymentScheduleToServiceTransferTemplate(template.Schedule, returnVal);

            return returnVal;
        }

        public static TransferTemplate MapInternalTransferTransactionTemplateServiceModelToClientModel(InternalTransferTransactionTemplateServiceModel serviceModel, Customer fromCustomer, Customer toCustomer, Account fromAccount, Account toAccount, List<GenericEnumMap> howToApplyList, List<GenericEnumMap> otherFeeList)
        {
            if (serviceModel == null)
            {
                return null;
            }

            return new TransferTemplate
            {
                TransactionId = serviceModel.TransactionTemplateId,
                FromCustomer = fromCustomer,
                ToCustomer = toCustomer,
                FromAccount = fromAccount,
                ToAccount = toAccount,
                AuditInfo = AuditInfoMappingHelper.MapAuditInfo(serviceModel.CreatedByName, serviceModel.CreatedOn, serviceModel.UpdatedBy, serviceModel.UpdatedOn, serviceModel.DeletedByApplication, serviceModel.UpdatedOn),
                StartDate = serviceModel.StartDate,
                ScheduleType = serviceModel.ScheduleType == ScheduleType.OneTime ? "One-time" : "Recurring",
                FromDisplay = $"{fromCustomer?.Cif} - {fromAccount?.AccountNumber}",
                ToDisplay = $"{toCustomer?.Cif} - {toAccount?.AccountNumber}",
                Amount = serviceModel.Amount,
                ExcessAmount = serviceModel.ExcessAmount,
                IsActive = serviceModel.IsActive,
                IsForm2279Complete = serviceModel.IsForm2279Complete,
                Nickname = serviceModel.Nickname,
                HowToApply = howToApplyList.FirstOrDefault(h => h.Id == (int?)serviceModel.TransactionType),
                OtherFeeCode = otherFeeList.FirstOrDefault(h => h.Id == (int?)serviceModel.OtherFeeCode),
                Schedule = SchedulerMappingHelper.MapScheduleFromServiceTransferTemplate(serviceModel)
            };
        }

        public static ScheduleType GetCoreScheduleTypeFromFrequency(PaymentSchedule schedule)
        {
            if (schedule.Frequency == Constants.ScheduleFrequencyOnce)
            {
                return ScheduleType.OneTime;
            }

            if (schedule.RecurringSchedule.Frequency == Constants.RecurringFrequencyWeekly)
            {
                return ScheduleType.Weekly;
            }

            if (schedule.RecurringSchedule.Frequency == Constants.QuarterlyFrequency)
            {
                return ScheduleType.Quarterly;
            }

            if (schedule.RecurringSchedule.Frequency == Constants.AnnualFrequency)
            {
                return ScheduleType.Annual;
            }

            if (schedule.RecurringSchedule.MonthlySchedule.RecurBy == Constants.MonthlyRecurCalendarDay)
            {
                return ScheduleType.MonthlyCalendarDays;
            }

            return ScheduleType.MonthlyDaysOfWeek;
        }


    }
}
