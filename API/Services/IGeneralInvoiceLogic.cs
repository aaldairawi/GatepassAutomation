
namespace API.Services
{
    public interface IGeneralInvoiceLogic
    {
        Task<bool> CheckIfInvoiceHasAlreadyBeenPrinted(string draftNumber);
    }
}