using System.Collections.Generic;
using FCSAmerica.Transact.Client.Models.InternalTransfers;
using FCSAmerica.Transact.Common.LocalConstants;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICoreInternalTransferServiceAgent
    {
        bool IsForm2279Required(int fromCustomerId, long fromAccountId, int toCustomerId, long toAccountId, ScheduleType scheduleType);
        int InsertTransactionTemplate(TransferTemplate template);
        List<TransferTemplate> GetTransfersByCustomer(int customerId);
        void DeleteTransfer(int transferId);
    }
}