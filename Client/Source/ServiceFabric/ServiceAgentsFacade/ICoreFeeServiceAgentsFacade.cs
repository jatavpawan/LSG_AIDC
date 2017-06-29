namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public interface ICoreFeeServiceAgentsFacade
    {
        decimal GetFeeAmount(int stopPaymentTypeId);
    }
}