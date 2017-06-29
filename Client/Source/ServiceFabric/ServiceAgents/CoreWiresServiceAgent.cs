using FCSAmerica.Transact.Client.Models.Wires;
using FCSAmerica.Transact.ServiceAgents.Common;
using FCSAmerica.Transact.ServiceModels;
using RestSharp;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent : ICoreWiresServiceAgent
    {
        public List<WiresIn> GetWiresIn(string officeIds)
        {
            var requestUrl = $"WiresIn/?officeIds={officeIds}";

            var coreWiresInServiceModels = ExecuteGet<List<WiresInServiceModel>>(requestUrl, _ecsSettings.CoreWiresApi);

            var wiresIn = new List<WiresIn>();

            if (coreWiresInServiceModels != null && coreWiresInServiceModels.Any())
            {
                coreWiresInServiceModels.ForEach(coreWire =>
                {
                    var wireInClient = WiresMappingHelper.MapWiresInServiceModelToClient(coreWire);
                    wiresIn.Add(wireInClient);
                });
            }

            return wiresIn;
        }

        public int AssignIncomingWires(WiresInAssignment wiresInAssignment)
        {
            if (wiresInAssignment.OfficeId.HasValue)
            {
                return AssignWireByOfficeId(wiresInAssignment);
            }

            if (wiresInAssignment.GLAccountId.HasValue)
            {
                return AssignWireByGLAccount(wiresInAssignment);
            }

            return -1;
        }

        private int AssignWireByOfficeId(WiresInAssignment wiresInAssignment)
        {
            if (wiresInAssignment == null)
            {
                return -1;
            }

            var wiresInAssignmentServiceModel = WiresMappingHelper.MapWiresInAssignmentClientToServiceModel(wiresInAssignment);

            var requestUrl = $"/WiresIn/{wiresInAssignment.WireInId}/OfficeId";

            return ExecutePutOrPost<int, WiresInAssignmentServiceModel>(requestUrl, _ecsSettings.CoreWiresApi, Method.PUT, wiresInAssignmentServiceModel);
        }

        private int AssignWireByGLAccount(WiresInAssignment wiresInAssignment)
        {
            if (wiresInAssignment == null)
            {
                return -1;
            }

            var assignIncomingWireRequest = new AssignIncomingWireRequestServiceModel();
            assignIncomingWireRequest.IncomingWireTransactionDetails = new List<IncomingWireTransactionDetailServiceModel>();

            assignIncomingWireRequest.IncomingWireTransactionDetails.Add(WiresMappingHelper.MapWiresInAssignmentByGlClientToServiceModel(wiresInAssignment));

            var requestUrl = $"/WiresIn/{wiresInAssignment.WireInId}";

            return ExecutePutOrPost<int, AssignIncomingWireRequestServiceModel>(requestUrl, _ecsSettings.CoreWiresApi, Method.POST, assignIncomingWireRequest);
        }

        public void UnassignIncomingWire(int id, WiresInUnassignment comment)
        {
            if (id == 0 || comment == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            WiresInUnassignmentServiceModel wiresInUnassignment = WiresMappingHelper.MapWiresInUnassignmentClientToServiceModel(comment);

            var requestUrl = $"/WiresIn/{id}/OfficeId/Unassign";

            ExecutePutOrPost<int, WiresInUnassignmentServiceModel>(requestUrl, _ecsSettings.CoreWiresApi, Method.PUT, wiresInUnassignment);
        }

        public WireInDetails GetIncomingWireTransactionDetailsById(int id)
        {
            if (id == 0)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            var requestUrl = $"/WiresIn/{id}/Transaction";

            var incomingWireTransactions = ExecuteGet<IncomingWireTransactionServiceModel>(requestUrl, _ecsSettings.CoreWiresApi);

            var wireInDetails = WiresMappingHelper.MapIncomingWiresTransactionServiceModelToClient(incomingWireTransactions);

            requestUrl = $"/WiresIn/{id}";

            var incomingWireDetails = ExecuteGet<IncomingWireDetailServiceModel>(requestUrl, _ecsSettings.CoreWiresApi);

            WiresMappingHelper.MapIncomingWireDetailServiceModelToClientModel(wireInDetails, incomingWireDetails);

            return wireInDetails;
        }

        public void AllocateIncomingWire(int id, List<WireInAllocation> wireInAllocations)
        {
            if (id == 0 || !wireInAllocations.Any())
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }


            if (wireInAllocations.Any())
            {
                var requestUrl = $"/WiresIn/{id}";
                var assignIncomingWireRequest = new AssignIncomingWireRequestServiceModel();
                assignIncomingWireRequest.IncomingWireTransactionDetails = new List<IncomingWireTransactionDetailServiceModel>();

                foreach (var wireInAllocation in wireInAllocations)
                {
                    var result = WiresMappingHelper.MapWiresInAllocationToServiceModel(wireInAllocation);
                    assignIncomingWireRequest.IncomingWireTransactionDetails.Add(result);
                }
                ExecutePutOrPost<int, AssignIncomingWireRequestServiceModel>(requestUrl, _ecsSettings.CoreWiresApi, Method.POST, assignIncomingWireRequest);
            }

        }
    }
}
