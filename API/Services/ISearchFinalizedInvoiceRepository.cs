using API.Dtos;
using API.Queries;

using Microsoft.Data.SqlClient;

namespace API.Services
{
    public class SearchFinalizedInvoiceRepository : ISearchFinalizedInvoice
    {
        private readonly IConfiguration _configuration;
        private readonly IGeneralInvoiceLogic __generalInvoicesLogic;
        public SearchFinalizedInvoiceRepository(IConfiguration configuration, IGeneralInvoiceLogic generalInvoicesLogic)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            __generalInvoicesLogic = generalInvoicesLogic ?? throw new ArgumentNullException(nameof(generalInvoicesLogic));
        }
        public async Task<FinalizedInvoiceDto> GetFinalizedInvoiceByDraftNumber(string invoiceDraftNumber)
        {

            FinalizedInvoiceDto result = new();
            var query = SQL_Daily_Invoice_Queries.GetSingleFinalizedInvoiceByDraftNumber();
            using SqlConnection connection = new(_configuration.GetConnectionString("N4Billing"));
            await connection.OpenAsync();
            using SqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@invoiceDraftNumber", invoiceDraftNumber);
            using SqlDataReader reader = await command.ExecuteReaderAsync();
            if (reader.HasRows)
            {
                while (await reader.ReadAsync())
                {
                    var draftNumber = reader["DraftNumber"].ToString() ?? "";
                    var finalNumber = reader["FinalNumber"].ToString() ?? "";
                    var contractCustomerGkey = reader["ContractCustomerGkey"].ToString() ?? "Nothing";
                    var creator = reader["Creator"].ToString() ?? "";
                    var payeeName = reader["PayeeName"].ToString() ?? "";
                    var created = reader["Created"].ToString() ?? "";
                    var invoiceType = reader["InvoiceType"].ToString() ?? "";
                    var invoiceStatus = reader["InvoiceStatus"].ToString() ?? "";

                    result.DraftNumber = draftNumber; result.FinalNumber = finalNumber;
                    result.ContractCutomerGkey = contractCustomerGkey; result.Creator = creator;
                    result.PayeeName = payeeName; result.Created = created; result.InvoiceType = invoiceType;
                    result.InvoiceStatus = invoiceStatus;
                }
            }
            else
            {
                return null!;
            }
            result.InvoicePrintedAlready = await __generalInvoicesLogic.CheckIfInvoiceHasAlreadyBeenPrinted(result.DraftNumber);
            return result;
        }


    }
}