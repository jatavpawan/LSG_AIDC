using FCSAmerica.Transact.Client.Models.Wires;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public interface ICoreWiresServiceAgentFacade
    {
        List<WiresIn> GetWiresIn(string officeIds);
        int AssignWiresIn(WiresInAssignment wiresInAssignment);
        void UnassignWiresIn(int id, WiresInUnassignment comment);
        WireInDetails GetIncomingWireTransactionDetailsById(int id);
        void AllocateWiresIn(int id, List<WireInAllocation> wireInAllocations);
    }
}
