namespace FCSAmerica.Transact.ServiceModels
{
    public class HolidayRootObjectServiceModel
    {
        public EmbeddedHolidayServiceModel _embedded { get; set; }
        public string schema { get; set; }
        public string tableName { get; set; }
    }
}
