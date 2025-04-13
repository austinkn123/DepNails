using AppLibrary.Interfaces;
using AppLibrary.Models;
using Dapper;
using Npgsql;
using System.Data;


namespace AppLibrary.Repositories
{
    public class TechniciansRepository : ITechniciansRepository
    {
        private readonly IDbConnection _dbConnection;

        public TechniciansRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public List<Technician> GetAllTechnicians()
        {
            return _dbConnection.Query<Technician>(getAllTechnicians).AsList();
        }

        public Technician? GetTechnicianById(int id)
        {
            var parameters = new { Id = id };
            return _dbConnection.QueryFirstOrDefault<Technician>(getTechnicianById, parameters);
        }


        #region queries
        private const string getAllTechnicians = @"
            SELECT id as Id, 
                   first_name AS FirstName,
                   last_name AS LastName,
                   email AS Email,
                   phone AS Phone,
                   created_at AS CreatedAt
	        FROM public.technicians;
        ";

        private const string getTechnicianById = @"
            SELECT id as Id,
                   first_name AS FirstName,
                   last_name AS LastName,
                   email AS Email,
                   phone AS Phone,
                   created_at AS CreatedAt
	        FROM public.technicians
            WHERE id = @Id;
        ";

        #endregion
    }
}
