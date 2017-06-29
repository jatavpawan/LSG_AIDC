namespace FCSAmerica.Transact.Client.Api.Helpers
{
    public interface IClientRestServiceHelperFactory
    {
        IClientRestServiceHelper CreateRestSharpHelper(string url);
    }
}