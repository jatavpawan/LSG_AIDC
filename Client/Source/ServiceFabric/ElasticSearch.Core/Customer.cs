using System.Collections.Generic;

namespace EnterpriseSearch.Core
{
    public class Customer
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public int Id { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
        public string LastFourSsn { get; set; }
        public string Cif { get; set; }
        public string YearOfBirth { get; set; }
        public int? DisplayNoteNumber { get; set; }
        public string OfficeName { get; set; }
        public int? OfficeCode { get; set; }
        public Account[] AccountNumbers { get; set; }
        public string DisplayAddress { get; set; }
        public string EntityName { get; set; }
        public string DisplayNameReverse { get; set; }
        public static IEnumerable<Customer> GetAll()
        {
            return new List<Customer>()
            {
                new Customer { FirstName = "Bob", LastName = "Jones", }
            };
        }
    }
}
