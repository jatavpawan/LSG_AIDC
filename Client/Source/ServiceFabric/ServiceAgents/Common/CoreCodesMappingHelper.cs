using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.Common.Constants;
using System.Collections.Generic;
using System.Linq;

namespace FCSAmerica.Transact.ServiceAgents.Common
{
    public class CoreCodesMappingHelper
    {
        public static GenericEnumMap MapServiceTransactionTypeToHowToApply(TransactionType? transactionType, List<GenericEnumMap> howToApplyList, bool hasExcessAmount)
        {
            var howToApply = new GenericEnumMap();
            if (transactionType.HasValue)
            {
                switch (transactionType)
                {
                    case TransactionType.ScheduledPayment:
                        if (hasExcessAmount)
                        {
                            howToApply = howToApplyList.FirstOrDefault(h => h.Id == 2);
                        }
                        else
                        {
                            howToApply = howToApplyList.FirstOrDefault(h => h.Id == 1);
                        }
                        break;
                    default:
                        howToApply = howToApplyList
                            .FirstOrDefault(h => h.Id == (int)transactionType);
                        break;

                }
            }

            return howToApply;

        }

        public static Office MapOfficeCentralCodesToOfficeClient(CodesDynamic_Office offices)
        {
            return new Office
            {
                OfficeCostCenter = offices.OfficeCostCenter.GetValueOrDefault(),
                OfficeId = offices.OfficeId,
                OfficeName = offices.OfficeName,
                RegionId = offices.RegionId.GetValueOrDefault(),
                RegionName = offices.Region
            };
        }
    }
}
