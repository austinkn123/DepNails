using AppLibrary.Interfaces;
using AppLibrary.Models;
using Dapper;
using System.Data;


namespace AppLibrary.Repositories
{
    public class ClientsRepository : IClientsRepository
    {
        private readonly IDbConnection _dbConnection;

        public ClientsRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }
        public void AddClient(Client client)
        {
            _dbConnection.Execute(AddClientQuery, new
            {
                client.FirstName,
                client.LastName,
                client.Email,
                client.Phone,
                client.DateOfBirth,
                client.CreatedAt
            });
        }

        public void RemoveClient(int id)
        {
            _dbConnection.Execute(RemoveClientQuery, new { Id = id });
        }

        public List<Client> GetAllClients()
        {
            return _dbConnection.Query<Client>(GetAllClientsQuery).ToList();
        }

        public Client? GetClient(int id)
        {
            return _dbConnection.QueryFirstOrDefault<Client>(GetClientQuery, new { Id = id });
        }

        #region queries

        private const string AddClientQuery = @"
            INSERT INTO public.clients (first_name, last_name, email, phone, date_of_birth, created_at)
            VALUES (@FirstName, @LastName, @Email, @Phone, @DateOfBirth, @CreatedAt)
        ";

        private const string RemoveClientQuery = @"
            DELETE FROM public.clients
            WHERE Id = @Id
        ";

        private const string GetAllClientsQuery = @"
            SELECT id, first_name, last_name, email, phone, date_of_birth, created_at
	        FROM public.clients;
        ";

        private const string GetClientQuery = @"
            SELECT id, first_name, last_name, email, phone, date_of_birth, created_at
            FROM public.clients
            WHERE Id = @Id
        ";

        #endregion

    }
}
