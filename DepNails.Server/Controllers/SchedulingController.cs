using AppLibrary.Interfaces;
using AppLibrary.Models;
using Microsoft.AspNetCore.Mvc;

namespace DepNails.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SchedulingController(ISchedulingRepository schedulingRepository) : ControllerBase
    {
        [HttpGet]
        [Route("appointments")]
        public IActionResult GetAllAppointments()
        {
            var appointments = schedulingRepository.GetAllAppointments();
            return Ok(appointments);

        }

        [HttpGet]
        [Route("client/{clientId}")]
        public IActionResult GetAppointmentsByClientId(int clientId)
        {
            var appointments = schedulingRepository.GetAppointmentsByClient(clientId);
            return Ok(appointments);
        }

        [HttpGet]
        [Route("date/{bookingDate}")]
        public IActionResult GetAppointmentByBookingDate(DateTime bookingDate)
        {
            var appointments = schedulingRepository.GetAppointmentsByDate(bookingDate);
            return Ok(appointments);
        }

        [HttpGet]
        [Route("technician/{technicianId}")]
        public IActionResult GetAppointmentsByTechnicianId(int technicianId)
        {
            var appointments = schedulingRepository.GetAppointmentsByTechnician(technicianId);
            return Ok(appointments);
        }

        [HttpPost]
        [Route("book")]
        public IActionResult CreateAppointment([FromBody] AppointmentRequest appointmentRequest)
        {
            schedulingRepository.ScheduleAppointment(appointmentRequest);
            return Ok("Appointment booked successfully");
        }

        [HttpDelete]
        [Route("remove/{id}")]
        public IActionResult RemoveAppointment(int id)
        {
            schedulingRepository.RemoveAppointment(id);
            return Ok("Appointment removed successfully");
        }

        [HttpPost]
        [Route("confirm")]
        public IActionResult ConfirmAppointment([FromBody] ConfirmAppointmentRequest confirmAppointmentRequest)
        {
            schedulingRepository.ConfirmAppointment(confirmAppointmentRequest);
            return Ok("Appointment confirmed successfully");
        }



    }
}
