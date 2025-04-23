using API.Constants;
using API.Dtos;
using API.Queries;
using Microsoft.Data.SqlClient;
using Microsoft.SqlServer.Server;

namespace API.Services
{
    public class PrintGatePassRepository : IPrintGatePass
    {
        private readonly IDatabase _database;
        public PrintGatePassRepository(IDatabase database)
        {
            _database = database ?? throw new ArgumentNullException(nameof(database));
        }

        public async Task<List<PrintGatePassContainerDto>> GetAllContainersToPrint(PrintGatePassDataDto data)
        {
            string customerContractNameResult = string.Empty;
            var query = SQL_Print_Invoice_Queries.GetInvoiceContainersToPrint();
            
            
            var result = await _database.ExecuteQueryAsync(DatabaseNames.BGTPortalN4, query, async reader =>
            {
                List<PrintGatePassContainerDto> result = [];
                while (await reader.ReadAsync())
                {
                    var containerNumber = reader["ContainerNumber"].ToString() ?? "";
                    var validityDate = reader["GatePassValidity"].ToString() ?? "";
                    var consignee = reader["Consignee"].ToString() ?? "";
                    var invoiceNumber = reader["InvoiceNumber"].ToString() ?? "";
                    var grossWeight = reader["GrossWeight"].ToString() ?? "";
                    var containerLength = reader["ContainerLength"].ToString() ?? "";
                    var freightKind = reader["ContainerFreightStatus"].ToString() ?? "";
                    var category = reader["ContainerCategory"].ToString() ?? "";
                    var lineId = reader["LineId"].ToString() ?? "";
                    var isoCode = reader["ContainerIsoCode"].ToString() ?? "";
                    var containerTimeIn = reader["ContainerTimeIn"].ToString() ?? "";
                    var containerYardLocation = reader["ContainerYardLocation"].ToString() ?? "";
                    var berth = reader["Berth"].ToString() ?? "";
                    var deliveryOrderDate = reader["DeliveryOrderDate"].ToString() ?? "";

                    var finalizedValidityDate = DetermineGatePassValidity(category, validityDate, containerTimeIn);
                    var formattedDeliveryOrderDate = FormatDate(deliveryOrderDate);

                    if (!string.IsNullOrEmpty(data.CustomerContractGkey))
                    {
                        customerContractNameResult = await GetCustomerContractName(data.CustomerContractGkey);
                    }

                    result.Add(new(containerNumber, DateTime.Now.ToString("yyyy-MM-dd"),
                        consignee, invoiceNumber, grossWeight, containerLength, freightKind,
                        category, lineId, isoCode, finalizedValidityDate, 
                        customerContractNameResult, containerYardLocation, berth, formattedDeliveryOrderDate));

                    for (int index = 0; index < result.Count; index++)
                    {
                        ArgoChargeableDto input = new(result[index].InvoiceNumber, result[index].ContainerNumber);
                        result[index].DeliveryType = await DetermineIfContainerIsInterchangeOrStripping(input) == true ? "TIC" : "CFS";

                        SavePrintedGatePassDataDto dataToSave = new(result[index].ContainerNumber, "NULL", result[index].InvoiceNumber, DateTime.Now.ToString(), data.User);

                        await SaveChanges(dataToSave);
                    }
                }
                return result;
            }, new SqlParameter("@draftNumber", data.DraftNumber));
            return result;
        }

        private static string DetermineGatePassValidity(string category, string validityDate, string timeInDate)
        {
            if (category.Equals("IMPRT") && !string.IsNullOrEmpty(validityDate) && !string.IsNullOrEmpty(timeInDate))
            {
                if (Convert.ToDateTime(validityDate) < Convert.ToDateTime(timeInDate).AddDays(6))
                {
                    return Convert.ToDateTime(timeInDate).AddDays(6).ToString("yyyy-MM-dd");
                }
                else
                {
                    return Convert.ToDateTime(validityDate).ToString("yyyy-MM-dd");
                }
            }
            if (category.Equals("IMPRT") && string.IsNullOrEmpty(validityDate) && !string.IsNullOrEmpty(timeInDate))
            {
                return Convert.ToDateTime(timeInDate).AddDays(6).ToString("yyyy-MM-dd");
            }
            return "None";
        }
        private static string FormatDate(string date)
        {
            bool stringIsParseableAsDate = DateTime.TryParse(date, out DateTime result);
            if(stringIsParseableAsDate) return result.ToString("yyyy-MM-dd");
            return "N/A";
        }

        public async Task<string> GetCustomerContractName(string gkey)
        {
            var query = SQL_Print_Invoice_Queries.GetCustomerContractName();
            var result = await _database.ExecuteQueryAsync(DatabaseNames.N4Billing, query, async reader =>
            {
                while (await reader.ReadAsync())
                {
                    var customerName = reader["CustomerName"].ToString() ?? "";
                    return customerName;
                }
                return string.Empty;
            }, new SqlParameter("@customerContractGkey", gkey));
            return result;
        }

        public async Task<List<PrintGatePassContainerDto>> GetAllContainersForcefully(PrintGatePassDataDto data)
        {
            string customerContractNameResult = string.Empty;
            var query = SQL_Print_Invoice_Queries.ForceGatePassPrint();

            var result = await _database.ExecuteQueryAsync(DatabaseNames.BGTPortalN4, query, async reader =>
            {
                List<PrintGatePassContainerDto> result = [];
                while (await reader.ReadAsync())
                {

                    var containerNumber = reader["ContainerNumber"].ToString() ?? "";
                    var validityDate = reader["GatePassValidity"].ToString() ?? "";
                    var consignee = reader["Consignee"].ToString() ?? "";
                    var invoiceNumber = reader["InvoiceNumber"].ToString() ?? "";
                    var grossWeight = reader["GrossWeight"].ToString() ?? "";
                    var containerLength = reader["ContainerLength"].ToString() ?? "";
                    var freightKind = reader["ContainerFreightStatus"].ToString() ?? "";
                    var category = reader["ContainerCategory"].ToString() ?? "";
                    var lineId = reader["LineId"].ToString() ?? "";
                    var isoCode = reader["ContainerIsoCode"].ToString() ?? "";
                    var containerTimeIn = reader["ContainerTimeIn"].ToString() ?? "";
                    var containerYardLocation = reader["ContainerYardLocation"].ToString() ?? "";
                    var berth = reader["Berth"].ToString() ?? "";
                    var finalizedValidityDate = DetermineGatePassValidity(category, validityDate, containerTimeIn);
                    var deliveryOrderDate = reader["DeliveryOrderDate"].ToString() ?? "";
                    var formattedDeliveryOrderDate  = FormatDate(deliveryOrderDate);

                    if (!string.IsNullOrEmpty(data.CustomerContractGkey))
                    {
                        customerContractNameResult = await GetCustomerContractName(data.CustomerContractGkey);
                    }

                    result.Add(new(containerNumber, DateTime.Now.ToString("yyyy-MM-dd"),
                        consignee, invoiceNumber, grossWeight, containerLength, freightKind,
                    category, lineId, isoCode, finalizedValidityDate, customerContractNameResult, containerYardLocation, berth
                    , formattedDeliveryOrderDate));
                }
                return result;
            }, new SqlParameter("@draftNumber", data.DraftNumber));


            for (int index = 0; index < result.Count; index++)
            {
                ArgoChargeableDto input = new(result[index].InvoiceNumber, result[index].ContainerNumber);
                result[index].DeliveryType = await DetermineIfContainerIsInterchangeOrStripping(input) == true ? "TIC" : "CFS";
                SavePrintedGatePassDataDto dataToSave = new(result[index].ContainerNumber, "NULL", result[index].InvoiceNumber, DateTime.Now.ToString(), data.User);
                await SaveChanges(dataToSave);
            }
            return result;
        }

        public async Task<bool> DetermineIfContainerIsInterchangeOrStripping(ArgoChargeableDto argoChargeableDto)
        {
            var query = SQL_Print_Invoice_Queries.DetermineIfContainerIsInterchangeOrStripped();

            var result = await _database.ExecuteQueryAsync(DatabaseNames.SparcsN4, query, async reader =>
            {
                if (await reader.ReadAsync()) return true;
                return false;
            }, new SqlParameter(@"draftNumber", argoChargeableDto.InvoiceDraftNumber), new SqlParameter("@containerNumber",
            argoChargeableDto.ContainerNumber));
            return result;
        }
        public async Task SaveChanges(SavePrintedGatePassDataDto data)
        {


            var query = SQL_Print_Invoice_Queries.SaveGatePassAfterPrinting();

            await _database.SaveChangesAsync(DatabaseNames.BGTPortalN4, query,
            new SqlParameter("@containerNumber", data.ContainerNumber),
            new SqlParameter("@berth", data.Berth), new SqlParameter("@draft_nbr", data.DraftNumber),
            new SqlParameter("@gatePassPrintDate", data.GatePassPrintDate), new SqlParameter("@gatePassPrintUser", data.GatePassPrintUser));
        }


    }
}