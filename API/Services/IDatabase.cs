
using Microsoft.Data.SqlClient;

namespace API.Services
{
    public interface IDatabase
    {

        Task<T> ExecuteQueryAsync<T>(string databaseConnection, string query, Func<SqlDataReader, Task<T>> reader, params SqlParameter[] paramaters);
        Task SaveChangesAsync(string databaseConnection, string query, params SqlParameter[] parameters);

    }
}