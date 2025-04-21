

using API.Constants;
using API.Queries;
using Microsoft.Data.SqlClient;

namespace API.Services
{
    public class GeneralInvoiceLogicRepository : IGeneralInvoiceLogic
    {

        private readonly IDatabase _database;
        public GeneralInvoiceLogicRepository(IDatabase database)
        {
            _database = database ?? throw new ArgumentNullException(nameof(database));
        }
        public async Task<bool> CheckIfInvoiceHasAlreadyBeenPrinted(string draftNumber)
        {
            var query = SQL_Daily_Invoice_Queries.GetInvoicePrintedAlready();
            var result = await _database.ExecuteQueryAsync(DatabaseNames.BGTPortalN4, query, async reader =>
            {
                if (await reader.ReadAsync()) return true;
                return false;
            }, new SqlParameter("@draftNumber", draftNumber));

            return result;
        }
    }
}