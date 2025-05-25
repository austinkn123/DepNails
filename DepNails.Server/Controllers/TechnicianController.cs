using AppLibrary.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DepNails.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TechnicianController(ITechniciansRepository techniciansRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllTechnicians()
        {
            var technicians = techniciansRepository.GetAllTechnicians();
            return Ok(technicians);
        }

        [HttpGet("{id}")]
        public IActionResult GetTechnicianById(int id)
        {
            var technician = techniciansRepository.GetTechnicianById(id);
            return Ok(technician);
        }
    }
}
