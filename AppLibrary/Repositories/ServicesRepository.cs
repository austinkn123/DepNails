using AppLibrary.Interfaces;

namespace AppLibrary.Repositories
{
    public class ServicesRepository : IServicesRepository
    {
        private readonly string _connectionString;

        public ServicesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddService(string serviceName)
        {
            throw new NotImplementedException();
        }

        public List<string> GetAllServices()
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
