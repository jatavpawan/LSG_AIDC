namespace FCSAmerica.Transact.WebUI.Common
{
    public interface ILogUtility
    {
        void Verbose(string format, params object[] args);

        void Info(string format, params object[] args);

        void Warning(string format, params object[] args);

        void Error(string format, params object[] args);

        bool IsGlobalError { get; set; }
        void SetCorrelationUniqueId(string correlationUniqueId);
    }
}