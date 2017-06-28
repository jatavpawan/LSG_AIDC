﻿using LSG_AIDC.BLL;
using LSG_AIDC.BLL.Repository;

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LSG_AIDC.Api
{
    public class VendorReviewController : ApiController
    {
        [HttpGet]
        public ResponseData ReceiveReceipt(int vendorDeliveryId, int? pOWorkListId, bool isException, string vendorDeliveryCode)
        {
            try
            {
                ReceiveReceiptReposistory obj = new ReceiveReceiptReposistory();
                ResponseData result = new ResponseData();
                try
                {
                    if (pOWorkListId == 0)
                        pOWorkListId = null;
                    if (vendorDeliveryCode == "null")
                        vendorDeliveryCode = null;

                    result.Data = obj.GetReceiveReceiptInfo(vendorDeliveryId, pOWorkListId, isException, vendorDeliveryCode);
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