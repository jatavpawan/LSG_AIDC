using FCSAmerica.Transact.Client.Models;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public interface ICoreCodesServiceAgentsFacade
    {
        List<GenericEnumMap> GetBankAccountTypes();
        List<Office> GetOffices();
        List<GenericEnumMap> GetHowToApplyList();
        List<GenericEnumMap> GetAchInRejectionReasonCodes();
        List<GenericEnumMap> GetAchOutRejectionReasonCodes();
        List<GenericEnumMap> GetAchOlderThan24HoursRejectReasonCodes();
        List<GenericEnumMap> GetDraftRejectionReasonCodes();
        List<Holiday> GetHolidays();
        List<GenericEnumMap> GetOtherFees();
        List<GenericEnumMap> GetOfficesBySearchString(string searchString);
    }
}