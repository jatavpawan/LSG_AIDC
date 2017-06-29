using FCSAmerica.EnterpriseLogging.Contracts.DataContracts;
using System;
using System.Diagnostics;
using System.Linq;
using System.Text;

namespace FCSAmerica.Transact.WebUI.Common
{
    public class LogUtility : ILogUtility
    {
        [ThreadStatic]
        private static string _correlationUniqueId = "0";

        public void SetCorrelationUniqueId(string correlationUniqueId)
        {
            _correlationUniqueId = correlationUniqueId;
        }

        public int ComputeSessionId(string correlationUniqueId)
        {
            if (string.IsNullOrEmpty(correlationUniqueId))
            {
                return 0;
            }

            Guid guid;
            if (Guid.TryParse(correlationUniqueId, out guid))
            {
                return guid.GetHashCode();
            }

            return 0;
        }

        private readonly TraceSource _traceSource = new TraceSource("FCSAmerica.Transact");

        public bool IsGlobalError { get; set; }

        public void Verbose(string format, params object[] args)
        {
            Log(MessageType.Verbose, format, args);
        }

        public void Info(string format, params object[] args)
        {
            Log(MessageType.Info, format, args);
        }

        public void Warning(string format, params object[] args)
        {
            Log(MessageType.Warning, format, args);
        }

        public void Error(string format, params object[] args)
        {
            Log(MessageType.Error, format, args);
        }

        private void Log(MessageType messageType, string format, object[] args)
        {
            var logEntry = BuildLogEntry(messageType, format, args);
            _traceSource.TraceLogEntry(logEntry);
        }

        private LogEntry BuildLogEntry(MessageType messageType, string format, object[] args)
        {
            return new LogEntry
            {
                SessionId = ComputeSessionId(_correlationUniqueId),
                MessageTag = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss fff"),
                MachineName = System.Environment.MachineName,
                UserName = System.Environment.UserName,
                TraceLevel = messageType,
                MessageText = StringFormatSafe(format, args)
            };
        }

        private string StringFormatSafe(string format, params object[] args)
        {
            if (args != null && !args.Any())
            {
                return format;
            }

            try
            {
                return string.Format(format, args);
            }
            catch (Exception)
            {
                var sb = new StringBuilder();
                sb.Append("Exception caught formatting the string - ");
                sb.Append("format: ");
                sb.Append(format);
                sb.Append("; args: [ ");
                var formattedArgs = string.Join(",", args);
                sb.Append(formattedArgs);
                sb.Append(" ]");

                return sb.ToString();
            }
        }
    }
}
