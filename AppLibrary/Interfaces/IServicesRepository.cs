

using AppLibrary.Models;

namespace AppLibrary.Interfaces
{
    public interface IServicesRepository
    {
        List<Service> GetAllServices();
        Service? GetServiceDetails(int serviceId);
    }
}
