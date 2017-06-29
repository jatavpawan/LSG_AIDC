using FCSAmerica.Transact.Client.Models.InternalTransfers;
using FCSAmerica.Transact.Common.LocalConstants;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public interface ICoreInternalTransferServiceAgentsFacade
    {
        bool IsForm2279Required(int fromCustomerId, long fromAccountId, int toCustomerId, long toAccountId, ScheduleType scheduleType);

        int InsertTransactionTemplate(TransferTemplate template);
        List<TransferTemplate> GetTransfersByCustomer(int customerId);
        void DeleteTransfer(int transferId);
    }
}