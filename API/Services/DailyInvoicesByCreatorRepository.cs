using System.Xml;
using API.Constants;
using API.Dtos;
using API.Queries;
using Microsoft.Data.SqlClient;

namespace API.Services
{
    public class DailyInvoicesByCreatorRepository : IDailyInvoicesByCreator
    {

        private readonly IGeneralInvoiceLogic _generalInvoiceLogic;
        private readonly IDatabase _database;
        public DailyInvoicesByCreatorRepository(IDatabase database, IGeneralInvoiceLogic generalInvoiceLogic)
        {
            _database = database ?? throw new ArgumentNullException(nameof(database));

            _generalInvoiceLogic = generalInvoiceLogic ?? throw new ArgumentNullException(nameof(generalInvoiceLogic));
        }
        public async Task<List<FinalizedInvoiceDto>> GetDailyFinalizedInvoicesByUser(string invoiceCreator)
        {
            var query = SQL_Daily_Invoice_Queries.GetDailyInvoicesCreatedByUser();
            var result = await _database.ExecuteQueryAsync(DatabaseNames.N4Billing, query,
            async reader =>
            {
                List<FinalizedInvoiceDto> result = [];
                while (await reader.ReadAsync())
                {
                    var draftNumber = reader["DraftNumber"].ToString() ?? "";
                    var finalNumber = reader["FinalNumber"].ToString() ?? "";
                    var contractCustomerGkey = reader["ContractCustomerGkey"].ToString() ?? string.Empty;
                    var creator = reader["Creator"].ToString() ?? "";
                    var payeeName = reader["PayeeName"].ToString() ?? "";
                    var created = reader["Created"].ToString() ?? "";

                    var invoiceType = reader["InvoiceType"].ToString() ?? "";
                    var invoiceStatus = reader["InvoiceStatus"].ToString() ?? "";
                    result.Add(new(draftNumber, finalNumber,
                            contractCustomerGkey, creator,
                            payeeName, created, invoiceType, invoiceStatus));
                }
                return result;
            }, new SqlParameter("@invoiceCreator", invoiceCreator));

            var checks = result.Select(async invoice =>
            {
                invoice.InvoicePrintedAlready = await _generalInvoiceLogic.CheckIfInvoiceHasAlreadyBeenPrinted(invoice.DraftNumber);
            }).ToList();
            await Task.WhenAll(checks);

            return result;
        }

        public async Task<List<InvoiceDetailInspectorDto>> GetInvoiceDetails(string draftNumber)
        {
            var query = SQL_Daily_Invoice_Queries.GetInvoiceItemDetails();

            var result = await _database.ExecuteQueryAsync(DatabaseNames.BGTPortalN4, query, async reader =>
            {
                List<InvoiceDetailInspectorDto> result = [];
                while (await reader.ReadAsync())
                {
                    var containerNumber = reader["ContainerNumber"].ToString() ?? "";
                    var validityDate = reader["GatePassValidity"].ToString() ?? "";
                    var consignee = reader["Consignee"].ToString() ?? "";
                    var containerLength = reader["ContainerLength"].ToString() ?? "";
                    var containerLocation = reader["ContainerLocation"].ToString() ?? "";
                    var freightKind = reader["ContainerFreightStatus"].ToString() ?? "";
                    var category = reader["ContainerCategory"].ToString() ?? "";
                    var lineId = reader["LineId"].ToString() ?? "";
                    var activeHold = reader["ActiveHold"].ToString() ?? "None";
                    var berth = reader["Berth"].ToString() ?? "";

                    string formattedDate = DateTime.TryParse(validityDate, out var date) ?
                    date.ToString("yyyy-MM-dd") : string.Empty;
                    result.Add(new(containerNumber, containerLocation,
                    formattedDate,
                     consignee, draftNumber, containerLength, freightKind, category, lineId,
                     string.IsNullOrEmpty(activeHold) ? "None" : activeHold,
                     berth));
                }
                return result;

            }, new SqlParameter("draftNumber", draftNumber));
            return result;
        }
    }
}