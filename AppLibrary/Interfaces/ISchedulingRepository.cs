
using AppLibrary.Models;

namespace AppLibrary.Interfaces
{
    public interface ISchedulingRepository
    {
        void AddAppointment(Appointment appointment);
        void RemoveAppointment(int appointmentId);
        List<Appointment> GetAllAppointments();
        List<Appointment> GetAppointmentsByTechnician(int technicianId);
        List<Appointment> GetAppointmentsByClient(int clientId);
        List<Appointment> GetAppointmentsByDate(DateTime appointmentDate);

    }
}
