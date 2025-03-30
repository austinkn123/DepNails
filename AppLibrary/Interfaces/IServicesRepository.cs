using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
