using LSG_AIDC.BLL;
using LSG_AIDC.BLL.Repository;

using System;
using System.ComponentModel;
using System.Linq;
using System.Web.Http;
using LSG_AIDC.Models;

namespace LSG_AIDC.Api
{
    public class VendorReviewController : ApiController
    {
        private ReceiveReceiptReposistory obj = new ReceiveReceiptReposistory();

        [HttpGet]
        public ResponseData ReceiveReceipt(int vendorDeliveryId, string pOWorkListId, bool isException, string vendorDeliveryCode)
        {
            try
            {
                ResponseData result = new ResponseData();
                try
                {
                    if (pOWorkListId == "null")
                        pOWorkListId = null;
                    if (vendorDeliveryCode == "null")
                        vendorDeliveryCode = null;

                   var receiveReceipt  = obj.GetReceiveReceiptInfo(vendorDeliveryId, pOWorkListId, isException, vendorDeliveryCode);

                    result.Data = new VendorDeliveryMaterialReceive();

                    if (receiveReceipt != null)
                    {
                        result.Data = receiveReceipt;
                    }

                    result.Status = "SUCCESS";
                    result.Error = "";
                    result.ErrorCode = "";
                }
                catch (Win32Exception ex)
                {
                    result.Status = "FAIL";
                    result.Error = ex.Message;
                    result.ErrorCode = "";
                }

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        public ResponseData GetPOList(int vendorDeliveryId)
        {
            try
            {
                ResponseData result = new ResponseData();

                try
                {
                    result.Data = obj.GetListOfPOs(vendorDeliveryId);
                    result.Status = "SUCCESS";
                    result.Error = "";
                    result.ErrorCode = "";
                }
                catch (Win32Exception ex)
                {
                    result.Status = "FAIL";
                    result.Error = ex.Message;
                    result.ErrorCode = "";
                }

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        public ResponseData GetDeliveriesList()
        {
            try
            {
                ResponseData result = new ResponseData();
                try
                {
                    result.Data = obj.GetListOfDeliveries().Select(s => s.VendorDelivery_ID).ToList();
                    result.Status = "SUCCESS";
                    result.Error = "";
                    result.ErrorCode = "";
                }
                catch (Win32Exception ex)
                {
                    result.Status = "FAIL";
                    result.Error = ex.Message;
                    result.ErrorCode = "";
                }

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
