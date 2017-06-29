namespace FCSAmerica.Transact.RestServiceAgents
{
    public static class RestServiceHelperFactory
    {
        public static RestServiceHelper CreateRestSharpHelper(string url)
        {
            return new RestServiceHelper(url);
        }
    }
}
