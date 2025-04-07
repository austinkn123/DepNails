using AppLibrary.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DepNails.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TechnicianController : ControllerBase
    {
        private readonly ITechniciansRepository _techniciansRepository;

        public TechnicianController(ITechniciansRepository techniciansRepository)
        {
            _techniciansRepository = techniciansRepository;
        }

        [HttpGet]
        public IActionResult GetAllTechnicians()
        {
            var technicians = _techniciansRepository.GetAllTechnicians();
            return Ok(technicians);
        }
    }
}
