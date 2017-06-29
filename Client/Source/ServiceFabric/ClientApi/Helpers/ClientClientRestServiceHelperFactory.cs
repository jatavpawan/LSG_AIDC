namespace FCSAmerica.Transact.Client.Api.Helpers
{
    public class ClientClientRestServiceHelperFactory : IClientRestServiceHelperFactory
    {
        public IClientRestServiceHelper CreateRestSharpHelper(string url)
        {
            return new ClientClientRestServiceHelper(url);
        }
    }
}
