

namespace LSG_AIDC.BLL.Repository
{
    using System.Collections.Generic;
    using System.Linq;
    using LSG_AIDC.DAL;
    public class ReceiveReceiptReposistory : Repository<VendorDelivery>
    {

        public List<GetReceiveReceiptInfo_Result> GetReceiveReceiptInfo(int? vendorDeliveryId = null, int? pOWorkListId = null, bool? isException = null, string vendorDeliveryCode = null)
        {
            var lst = DbContext.GetReceiveReceiptInfo(vendorDeliveryId, pOWorkListId, vendorDeliveryCode, isException).ToList();
            return lst;
        }





    }
}
