using FCSAmerica.Transact.Client.Models;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICoreCodesServiceAgent
    {
        List<GenericEnumMap> GetBankAccountTypes();
        GenericEnumMap GetBankAccountType(int bankAccountTypeId);
        List<Office> GetOffices();
        List<GenericEnumMap> GetHowToApplyList();
        List<GenericEnumMap> GetAchInRejectReasonCodes();
        List<GenericEnumMap> GetAchOutRejectReasonCodes();
        List<GenericEnumMap> GetAchOlderThan24HoursRejectReasonCodes();
        List<GenericEnumMap> GetDraftRejectReasonCodes();
        List<GenericEnumMap> GetOtherFees();
        List<GenericEnumMap> GetOfficesForDropDown(string searchString);

    }
}