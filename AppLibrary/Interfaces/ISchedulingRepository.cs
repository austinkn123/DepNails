
using AppLibrary.Models;

namespace AppLibrary.Interfaces
{
    public interface ISchedulingRepository
    {
        void ScheduleAppointment(AppointmentRequest appointmentRequest);
        void RemoveAppointment(int appointmentId);
        List<Appointment> GetAllAppointments();
        List<Appointment> GetAppointmentsByTechnician(int technicianId);
        List<Appointment> GetAppointmentsByClient(int clientId);
        List<Appointment> GetAppointmentsByDate(DateTime appointmentDate);
        void ConfirmAppointment(ConfirmAppointmentRequest confirmAppointmentRequest);

    }
}
