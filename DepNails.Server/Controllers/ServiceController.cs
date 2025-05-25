using AppLibrary.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DepNails.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController(IServicesRepository servicesRepository) : Controller
    {
        [HttpGet]
        [Route("all")]
        public IActionResult GetAllServices()
        {
            var services = servicesRepository.GetAllServices();
            return Ok(services);
        }

        [HttpGet("{id}")]
        public IActionResult GetServiceDetails(int id)
        {
            var service = servicesRepository.GetServiceDetails(id);
            if (service == null)
            {
                return NotFound();
            }
            return Ok(service);
        }
    }
}
