using AppLibrary.Interfaces;
using AppLibrary.Models;
using Dapper;
using System.Data;


namespace AppLibrary.Repositories
{
    public class ClientsRepository(IDbConnection dbConnection) : IClientsRepository
    {
        public void AddClient(Client client)
        {
            dbConnection.Execute(AddClientQuery, new
            {
                client.FirstName,
                client.LastName,
                client.Email,
                client.Phone,
                client.CreatedAt,
                client.CognitoUserId
            });
        }

        public void RemoveClient(int id)
        {
            dbConnection.Execute(RemoveClientQuery, new { Id = id });
        }

        public List<Client> GetAllClients()
        {
            return dbConnection.Query<Client>(GetAllClientsQuery).ToList();
        }

        public Client? GetClient(int id)
        {
            return dbConnection.QueryFirstOrDefault<Client>(GetClientQuery, new { Id = id });
        }

        public Client? GetClientByCognitoUserId(Guid? cognitoUserId)
        {
            return dbConnection.QueryFirstOrDefault<Client>(GetClientByCognitoUserIdQuery, new { CognitoUserId = cognitoUserId });
        }

        #region queries

        private const string AddClientQuery = @"
            INSERT INTO public.clients (first_name, last_name, email, phone, created_at, cognito_sub)
            VALUES (@FirstName, @LastName, @Email, @Phone, @CreatedAt, @CognitoUserId)
        ";

        private const string RemoveClientQuery = @"
            DELETE FROM public.clients
            WHERE Id = @Id
        ";

        private const string GetAllClientsQuery = @"
            SELECT id, first_name as firstName, last_name as lastName, email, phone, created_at as createdAt
	        FROM public.clients;
        ";

        private const string GetClientQuery = @"
            SELECT id, first_name as firstName, last_name as lastName, email, phone, created_at as createdAt
            FROM public.clients
            WHERE Id = @Id
        ";

        private const string GetClientByCognitoUserIdQuery = @"
            SELECT id, first_name as firstName, last_name as lastName, email, phone, created_at as createdAt
            FROM public.clients
            WHERE cognito_sub = @CognitoUserId
        ";

        #endregion

    }
}
