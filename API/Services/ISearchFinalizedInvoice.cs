
using API.Dtos;

namespace API.Services
{
    public interface  ISearchFinalizedInvoice
    {
        Task<FinalizedInvoiceDto> GetFinalizedInvoiceByDraftNumber(string draftNumber);

    }
}