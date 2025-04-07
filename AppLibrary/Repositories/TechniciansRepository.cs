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
        public void AddTechnician(string name)
        {
            throw new NotImplementedException();
        }

        public List<Technician> GetAllTechnicians()
        {
            return _dbConnection.Query<Technician>(getAllTechnicians).AsList();
        }

        public string GetTechnicianDetails(int technicianId)
        {
            throw new NotImplementedException();
        }

        public void RemoveTechnician(int technicianId)
        {
            throw new NotImplementedException();
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

        #endregion
    }
}
