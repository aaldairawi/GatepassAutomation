
using Microsoft.Data.SqlClient;
using Microsoft.OpenApi.Models;

namespace API.Services
{
    public class DatabaseRepository : IDatabase
    {
        private readonly IConfiguration _configuration;
        public DatabaseRepository(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }
        public async Task<T> ExecuteQueryAsync<T>(string databaseConnection, string query, Func<SqlDataReader, Task<T>> reader, params SqlParameter[] parameters)
        {

            using SqlConnection connection = new(_configuration.GetConnectionString(databaseConnection));
            await connection.OpenAsync();

            using SqlCommand command = new(query, connection);

            if (parameters is not null && parameters.Length > 0)
            {
                command.Parameters.AddRange(parameters);
            }
            using SqlDataReader sqlDataReader = await command.ExecuteReaderAsync();
            return await reader(sqlDataReader);
        }

        public async Task  SaveChangesAsync(string databaseConnection, string query, params SqlParameter[] parameters)
        {

            using SqlConnection connection = new(_configuration.GetConnectionString(databaseConnection));
            await connection.OpenAsync();
            using SqlCommand command = new(query, connection);
            if (parameters is not null && parameters.Length > 0)
            {
                command.Parameters.AddRange(parameters);
            }
            await command.ExecuteNonQueryAsync();
        }

    }
}