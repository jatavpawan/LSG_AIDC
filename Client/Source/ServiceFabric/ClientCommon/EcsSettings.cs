using FCSAmerica.Transact.Common;

namespace FCSAmerica.Transact.ClientCommon
{
    public class EcsSettings : EcsSettingBase, IEcsSettings
    {
        public string ElasticSearchServer { get; set; }
        public string ElasticSearchIndex { get; set; }
        public string ServiceFabricApi { get; set; }
        public string CoreAchApi { get; set; }
        public string CoreBankApi { get; set; }
        public string CoreCodesApi { get; set; }
        public string CentralCodesApi { get; set; }
        public string CoreDiagnosticStatusResource { get; set; }
        public string CoreDraftApi { get; set; }
        public string CoreFeeApi { get; set; }
        public string CoreInternalTransferApi { get; set; }
        public string CoreWiresApi { get; set; }
    }
}
