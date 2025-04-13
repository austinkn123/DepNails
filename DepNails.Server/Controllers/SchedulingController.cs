using AppLibrary.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DepNails.Server.Controllers
{
    public class SchedulingController(ISchedulingRepository schedulingRepository) : ControllerBase
    {
        [HttpGet]
        [Route("appointments")]
        public IActionResult GetAllAppointments()
        {
            var appointments = schedulingRepository.GetAllAppointments();
            return Ok(appointments);

        }

    }
}
