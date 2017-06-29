using FCSAmerica.Transact.Client.Models;
using System;

namespace FCSAmerica.Transact.ServiceAgents.Common
{
    public class AuditInfoMappingHelper
    {
        public static AuditInfo MapAuditInfo(string createdBy, DateTime createdOn, string updatedBy, DateTime updatedOn, string deletedBy, DateTime? deletedOn)
        {
            return new AuditInfo
            {
                CreatedBy = createdBy,
                CreatedOn = createdOn,
                UpdatedBy = updatedBy,
                UpdatedOn = updatedOn,
                DeletedBy = deletedBy,
                DeletedOn = deletedOn
            };
        }
    }
}
