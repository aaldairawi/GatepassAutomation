
using API.Dtos;

namespace API.Services
{
    public interface IPrintGatePass
    {
        Task<List<PrintGatePassContainerDto>> GetAllContainersToPrint(PrintGatePassDataDto  data);
        
        Task<List<PrintGatePassContainerDto>> GetAllContainersForcefully(PrintGatePassDataDto  data);

        Task<bool> DetermineIfContainerIsInterchangeOrStripping(ArgoChargeableDto argoChargeableDto);
        Task<string> GetCustomerContractName(string gkey);
        Task SaveChanges(SavePrintedGatePassDataDto data);


    }
}