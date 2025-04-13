using AppLibrary.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DepNails.Server.Controllers
{
    public class ServiceController(IServicesRepository servicesRepository) : Controller
    {
        [HttpGet]
        public IActionResult GetAllServices()
        {
            var services = servicesRepository.GetAllServices();
            return Ok(services);
        }
    }
}
