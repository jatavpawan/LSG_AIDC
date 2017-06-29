using FCSAmerica.CentralCodes;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.Common.Constants;
using FCSAmerica.Transact.ServiceAgents.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using LocalConstants = FCSAmerica.Transact.Common.LocalConstants;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent : ICoreCodesServiceAgent
    {
        private static List<CodesDynamic_Office> _centralCodesOffices;
        private static List<Office> _offices;
        private static List<GenericEnumMap> _enumMappedOffices;

        public List<GenericEnumMap> GetBankAccountTypes()
        {
            return ConvertToGenericEnumMap(_enumHelper.GetBankAccountTypes()).OrderBy(x => x.Description).ToList();
        }

        public GenericEnumMap GetBankAccountType(int bankAccountTypeId)
        {
            return GetBankAccountTypes().FirstOrDefault(i => i.Id == bankAccountTypeId);
        }

        public List<Office> GetOffices()
        {
            if (_offices == null || !_offices.Any())
            {
                _centralCodesOffices = _codesManager.GetList<CodesDynamic_Office>();

                _offices = new List<Office>();

                _centralCodesOffices.ForEach(o =>
                {
                    _offices.Add(CoreCodesMappingHelper.MapOfficeCentralCodesToOfficeClient(o));
                });
            }
            return _offices;
        }

        public List<GenericEnumMap> GetOfficesForDropDown(string searchString)
        {

            if (_centralCodesOffices == null || !_centralCodesOffices.Any())
            {
                _centralCodesOffices = _codesManager.GetList<CodesDynamic_Office>();
            }

            var filteredList = _centralCodesOffices;
            if (!string.IsNullOrWhiteSpace(searchString))
            {

                filteredList = _centralCodesOffices.Where(x => x.OfficeCostCenter.GetValueOrDefault().ToString().StartsWith(searchString)
                                                                   || x.OfficeName.ToLower().StartsWith(searchString.ToLower())).ToList();
            }
            _enumMappedOffices = new List<GenericEnumMap>();

            if (filteredList.Any())
            {
                filteredList.ForEach(o =>
                {
                    _enumMappedOffices.Add(new GenericEnumMap
                    {
                        Id = o.OfficeId,
                        Description = o.OfficeCostCenter.GetValueOrDefault().ToString() + " - " + o.OfficeName
                    });
                });

            }

            return _enumMappedOffices;
        }

        public List<GenericEnumMap> GetHowToApplyList()
        {
            return ConvertToGenericEnumMap(_enumHelper.GetPaymentTransactionTypes());
        }

        public List<GenericEnumMap> GetOtherFees()
        {
            return ConvertToGenericEnumMap(Enum.GetValues(typeof(FeeCode)).Cast<FeeCode>().ToList());
        }

        public List<GenericEnumMap> GetAchInRejectReasonCodes()
        {
            return ConvertToGenericEnumMap(_enumHelper.GetAchInReasons());
        }

        public List<GenericEnumMap> GetAchOutRejectReasonCodes()
        {
            return ConvertToGenericEnumMap(_enumHelper.GetAchOutReasons());
        }

        public List<GenericEnumMap> GetAchOlderThan24HoursRejectReasonCodes()
        {
            return ConvertToGenericEnumMap(_enumHelper.GetAchOlderThan24());
        }

        public List<GenericEnumMap> GetDraftRejectReasonCodes()
        {
            return ConvertToGenericEnumMap(_enumHelper.GetDraftReasons());
        }

        internal List<GenericEnumMap> ConvertToGenericEnumMap<T>(List<T> enumList) where T : struct
        {
            var mappedRejectReasonCodes = new List<GenericEnumMap>();

            enumList.ForEach(enumItem =>
            {
                var parsedEnum = Enum.Parse(typeof(T), enumItem.ToString()) as Enum;
                mappedRejectReasonCodes.Add(new GenericEnumMap
                {
                    Id = Convert.ToInt32(parsedEnum),
                    Description = enumItem.GetDescription()
                });
            });

            return mappedRejectReasonCodes;
        }
    }
}
