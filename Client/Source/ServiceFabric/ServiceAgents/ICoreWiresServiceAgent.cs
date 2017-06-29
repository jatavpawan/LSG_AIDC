using FCSAmerica.Transact.Client.Models.Wires;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICoreWiresServiceAgent
    {
        List<WiresIn> GetWiresIn(string officeIds);
        int AssignIncomingWires(WiresInAssignment wiresInAssignment);
        void UnassignIncomingWire(int id, WiresInUnassignment comment);
        WireInDetails GetIncomingWireTransactionDetailsById(int id);
        void AllocateIncomingWire(int id, List<WireInAllocation> wireInAllocations);
    }
}
