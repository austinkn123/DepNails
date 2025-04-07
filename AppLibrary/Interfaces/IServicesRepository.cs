

using AppLibrary.Models;

namespace AppLibrary.Interfaces
{
    public interface IServicesRepository
    {
        void AddService(string serviceName);
        void RemoveService(string serviceName);
        List<Service> GetAllServices();
        string GetServiceDetails(string serviceName);
    }
}
