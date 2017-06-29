namespace FCSAmerica.Transact.Client.Models.Facilities
{
    public class Facility
    {
        public string FacilityPid { get; set; }
        public string FacilityName { get; set; }
        public string Fcn { get; set; }
        public string PrimaryCustomerName { get; set; }
        public string CommitmentTypeDesc { get; set; }
        public double? AvailableToDraw { get; set; }
        public double? OutstandingPrincipalBalance { get; set; }
        public string Association { get; set; }
        public string RelationshipTypeDesc { get; set; }
    }
}
