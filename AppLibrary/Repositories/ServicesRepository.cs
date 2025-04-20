using AppLibrary.Interfaces;
using AppLibrary.Models;
using Dapper;
using System.Data;

namespace AppLibrary.Repositories
{
    public class ServicesRepository(IDbConnection dbConnection) : IServicesRepository
    {
        public List<Service> GetAllServices()
        {
            return dbConnection.Query<Service>(getAllServices).ToList();
        }

        public Service? GetServiceDetails(int serviceId)
        {
            return dbConnection.QueryFirstOrDefault<Service>(getServiceDetails, new { ServiceId = serviceId });
        }

        #region queries

        private const string getAllServices = @"
            SELECT id, 
                service_name as ServiceName, 
                description, 
                duration, 
                price
	        FROM public.services;
        ";

        private const string getServiceDetails = @"
            SELECT id, 
                service_name as ServiceName, 
                description, 
                duration, 
                price
	        FROM public.services
            WHERE id = @ServiceId;
        ";


        #endregion
    }
}
