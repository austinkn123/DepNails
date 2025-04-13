using AppLibrary.Interfaces;
using AppLibrary.Models;
using Dapper;
using System.Data;


namespace AppLibrary.Repositories
{
    public class SchedulingRepository : ISchedulingRepository
    {
        private readonly IDbConnection _dbConnection;

        public SchedulingRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }
        //TODO: need to add and connect services to appointments
        public void AddAppointment(Appointment appointment)
        {
            _dbConnection.Execute(addAppointment, new
            {
                appointment.Id,
                appointment.ClientId,
                appointment.TechnicianId,
                appointment.AppointmentDate,
                appointment.AppointmentTime,
                appointment.Duration,
                appointment.Status,
                appointment.Notes,
                appointment.Paid
            });
        }

        public List<Appointment> GetAllAppointments()
        {
            return _dbConnection.Query<Appointment>(getAllAppointments).AsList();
        }

        public List<Appointment> GetAppointmentsByClient(int clientId)
        {
            return _dbConnection.Query<Appointment>(appointmentsByClient, new { ClientId = clientId }).AsList();
        }

        public List<Appointment> GetAppointmentsByDate(DateTime appointmentDate)
        {
            return _dbConnection.Query<Appointment>(appointmentsByDate, new { AppointmentDate = appointmentDate }).AsList();
        }

        public List<Appointment> GetAppointmentsByTechnician(int technicianId)
        {
            return _dbConnection.Query<Appointment>(appointmentsByTechnician, new { TechnicianId = technicianId }).AsList();
        }

        public void RemoveAppointment(int appointmentId)
        {
            _dbConnection.Execute(removeAppointment, new
            {
                AppointmentId = appointmentId
            });
        }

        #region queries
        private const string addAppointment = @"
            INSERT  INTO public.appointments
                (id, client_id, technician_id, appointment_date, appointment_time, duration, status, notes, paid)
            VALUES (@Id, @ClientId, @TechnicianId, @AppointmentDate, @AppointmentTime, @Duration, @Status, @Notes, @Paid);
        ";

        private const string getAllAppointments = @"
            SELECT id, 
                    client_id,
                    technician_id, 
                    appointment_date,
                    appointment_time, 
                    duration, 
                    status, 
                    notes, 
                    paid
	        FROM public.appointments;
        ";

        private const string appointmentsByClient = @"
            SELECT id, 
                    client_id,
                    technician_id, 
                    appointment_date,
                    appointment_time, 
                    duration, 
                    status, 
                    notes, 
                    paid
            FROM public.appointments
            WHERE client_id = @ClientId;
        ";

        private const string appointmentsByDate = @"
            SELECT id, 
                    client_id,
                    technician_id, 
                    appointment_date,
                    appointment_time, 
                    duration, 
                    status, 
                    notes, 
                    paid
            FROM public.appointments
            WHERE appointment_date = @AppointmentDate;
        ";

        private const string appointmentsByTechnician = @"
            SELECT id, 
                    client_id,
                    technician_id, 
                    appointment_date,
                    appointment_time, 
                    duration, 
                    status, 
                    notes, 
                    paid
            FROM public.appointments
            WHERE technician_id = @TechnicianId;
        ";

        private const string removeAppointment = @"
            DELETE FROM public.appointments
            WHERE id = @AppointmentId;
        ";
        #endregion
    }
}
