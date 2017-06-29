namespace FCSAmerica.Transact.ClientCommon
{
    public interface IEcsSettings
    {
        string ElasticSearchServer { get; set; }
        string ElasticSearchIndex { get; set; }
        string ServiceFabricApi { get; set; }
        string CoreAchApi { get; set; }
        string CoreBankApi { get; set; }
        string CoreCodesApi { get; set; }
        string CentralCodesApi { get; set; }
        string CoreDiagnosticStatusResource { get; set; }
        string CoreDraftApi { get; set; }
        string CoreFeeApi { get; set; }
        string CoreInternalTransferApi { get; set; }
        string CoreWiresApi { get; set; }
    }
}