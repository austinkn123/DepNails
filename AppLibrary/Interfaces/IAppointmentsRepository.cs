﻿
namespace AppLibrary.Interfaces
{
    public interface IAppointmentsRepository
    {
        void AddAppointment(DateTime appointmentDate, int technicianId, string clientName, string serviceName);
        void RemoveAppointment(int appointmentId);
        List<string> GetAllAppointments();
        List<string> GetAppointmentsByTechnician(int technicianId);
        List<string> GetAppointmentsByClient(string clientName);
        List<string> GetAppointmentsByDate(DateTime appointmentDate);

    }
}
