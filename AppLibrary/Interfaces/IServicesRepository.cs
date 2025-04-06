

namespace AppLibrary.Interfaces
{
    public interface IServicesRepository
    {
        void AddService(string serviceName);
        void RemoveService(string serviceName);
        List<string> GetAllServices();
        string GetServiceDetails(string serviceName);
    }
}
