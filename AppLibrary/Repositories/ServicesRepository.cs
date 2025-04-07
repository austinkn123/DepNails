using AppLibrary.Interfaces;
using AppLibrary.Models;
using System.Data;

namespace AppLibrary.Repositories
{
    public class ServicesRepository : IServicesRepository
    {
        private readonly IDbConnection _dbConnection;

        public ServicesRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public void AddService(string serviceName)
        {
            throw new NotImplementedException();
        }

        public List<Service> GetAllServices()
        {
            throw new NotImplementedException();
        }

        public string GetServiceDetails(string serviceName)
        {
            throw new NotImplementedException();
        }

        public void RemoveService(string serviceName)
        {
            throw new NotImplementedException();
        }
    }
}
