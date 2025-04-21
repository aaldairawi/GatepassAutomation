using System.Runtime.CompilerServices;
using API.Dtos;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FinalizedInvoicesController : BaseAPIController
    {
        private readonly IDailyInvoicesByCreator _dailyInvoices;
        private readonly ISearchFinalizedInvoice _searchFinalizedInvoice;
        public FinalizedInvoicesController(IDailyInvoicesByCreator dailyInvoices, ISearchFinalizedInvoice searchFinalizedInvoice)
        {
            _dailyInvoices = dailyInvoices ?? throw new ArgumentNullException(nameof(dailyInvoices));
            _searchFinalizedInvoice = searchFinalizedInvoice ?? throw new ArgumentNullException(nameof(searchFinalizedInvoice));
        }

        [HttpGet]
        public async Task<ActionResult<List<FinalizedInvoiceDto>>> GetAllInvoicesByCreator(string invoiceCreator)
        {
            
            List<FinalizedInvoiceDto> result = await _dailyInvoices.GetDailyFinalizedInvoicesByUser(invoiceCreator);
            return Ok(result);
        }

        [HttpGet("invoicedetails/{draftNumber}")]
        public async Task<ActionResult<List<InvoiceDetailInspectorDto>>> GetInvoiceDetails(string draftNumber)
        {
            var result = await _dailyInvoices.GetInvoiceDetails(draftNumber);
            if (result is null)
            {
                return NotFound(new ProblemDetails { Title = "No Detailed Results Found" });
            }
            return Ok(result);
        }
        [HttpGet("singleInvoice/{draftNumber}")]
        public async Task<ActionResult<FinalizedInvoiceDto>> GetSingleInvoice(string draftNumber)
        {

            var result = await _searchFinalizedInvoice.GetFinalizedInvoiceByDraftNumber(draftNumber);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

    }
}