
using API.Dtos;

namespace API.Services
{
    public interface IDailyInvoicesByCreator
    {
        Task<List<FinalizedInvoiceDto>> GetDailyFinalizedInvoicesByUser(string creator);
        
        public Task<List<InvoiceDetailInspectorDto>> GetInvoiceDetails(string draftNumber);
        

    }
}