﻿

namespace LSG_AIDC.BLL.Repository
{
    using System.Collections.Generic;
    using System.Linq;
    using LSG_AIDC.DAL;
    public class ReceiveReceiptReposistory : Repository<VendorDelivery>
    {

        public List<GetReceiveReceiptInfo_Result> GetReceiveReceiptInfo(int? vendorDeliveryId = null, string pOWorkListId =null, bool? isException = null, string vendorDeliveryCode = null)
        {
            var lst = DbContext.GetReceiveReceiptInfo(vendorDeliveryId, pOWorkListId, vendorDeliveryCode, isException).ToList();
            return lst;
        }


        public List<GetListOfPOs_Result> GetListOfPOs(int? vendorDeliveryId = null)
        {
            var lst = DbContext.GetListOfPOs(vendorDeliveryId).ToList();
            List<GetListOfPOs_Result> objlst = new List<GetListOfPOs_Result>();
            GetListOfPOs_Result obj = new GetListOfPOs_Result();
            lst.ForEach(z => { obj.SAP_PO_ID = z; objlst.Add(obj); });
            return objlst;
        }
         

    }
}
