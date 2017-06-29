using FCSAmerica.Transact.Client.Models.Wires;
using FCSAmerica.Transact.ServiceAgents;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public class CoreWiresServiceAgentFacade : ICoreWiresServiceAgentFacade
    {
        private readonly ICoreWiresServiceAgent _coreWiresServiceAgent;

        public CoreWiresServiceAgentFacade(ICoreWiresServiceAgent coreWiresServiceAgent)
        {
            _coreWiresServiceAgent = coreWiresServiceAgent;
        }

        public List<WiresIn> GetWiresIn(string officeIds)
        {
            return _coreWiresServiceAgent.GetWiresIn(officeIds);
        }

        public int AssignWiresIn(WiresInAssignment wiresInAssignment)
        {
            return _coreWiresServiceAgent.AssignIncomingWires(wiresInAssignment);
        }

        public void UnassignWiresIn(int id, WiresInUnassignment comment)
        {
            _coreWiresServiceAgent.UnassignIncomingWire(id, comment);
        }

        public WireInDetails GetIncomingWireTransactionDetailsById(int id)
        {
            return _coreWiresServiceAgent.GetIncomingWireTransactionDetailsById(id);
        }

        public void AllocateWiresIn(int id, List<WireInAllocation> wireInAllocations)
        {
            _coreWiresServiceAgent.AllocateIncomingWire(id, wireInAllocations);
        }
    }
}
