using System;
using System.Collections.Generic;
using FCSAmerica.Transact.Client.Models.InternalTransfers;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceAgents;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public class CoreInternalTransferServiceAgentFacade : ICoreInternalTransferServiceAgentsFacade
    {
        private readonly ICoreInternalTransferServiceAgent _internalTransferServiceAgent;
        private readonly ILogUtility _logUtility;

        public CoreInternalTransferServiceAgentFacade(ILogUtility logUtility, ICoreInternalTransferServiceAgent internalTransferServiceAgent)
        {
            _internalTransferServiceAgent = internalTransferServiceAgent;
            _logUtility = logUtility;
        }

        public bool IsForm2279Required(int fromCustomerId, long fromAccountId, int toCustomerId, long toAccountId, ScheduleType scheduleType)
        {
            return _internalTransferServiceAgent.IsForm2279Required(fromCustomerId, fromAccountId, toCustomerId, toAccountId, scheduleType);
        }

        public int InsertTransactionTemplate(Client.Models.InternalTransfers.TransferTemplate template)
        {
            return _internalTransferServiceAgent.InsertTransactionTemplate(template);
        }

        public List<TransferTemplate> GetTransfersByCustomer(int customerId)
        {
            return _internalTransferServiceAgent.GetTransfersByCustomer(customerId);
        }

        public void DeleteTransfer(int transferId)
        {
            _internalTransferServiceAgent.DeleteTransfer(transferId);
        }
    }
}