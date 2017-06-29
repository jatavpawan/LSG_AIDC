namespace FCSAmerica.Transact.Client.Models.Deals
{
    public class Deal
    {
        public string DealPid { get; set; }
        public string DealName { get; set; }

        public string HostBank { get; set; }
        public string RelationshipTypeDesc { get; set; }

        public double? HostBankNetCurrentCommitment { get; set; }

        public double? FcsAmericaNetHold { get; set; }
    }
}
