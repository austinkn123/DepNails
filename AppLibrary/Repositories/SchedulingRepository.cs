using AppLibrary.Interfaces;
using AppLibrary.Models;
using Dapper;
using System.Data;


namespace AppLibrary.Repositories
{
    public class SchedulingRepository(IDbConnection dbConnection) : ISchedulingRepository
    {
        //TODO: need to add and connect services to appointments
        public void ScheduleAppointment(AppointmentRequest appointmentRequest)
        {
            using var connection = dbConnection;
            connection.Open();

            using var transaction = connection.BeginTransaction();

            try
            {
                // Insert into appointments and get the new ID
                var appointmentId = connection.ExecuteScalar<int>(
                    addAppointment,
                    new
                    {
                        appointmentRequest.ClientId,
                        appointmentRequest.TechnicianId,
                        appointmentRequest.AppointmentDate,
                        appointmentRequest.AppointmentTime,
                        appointmentRequest.Duration,
                        appointmentRequest.Status,
                        appointmentRequest.Notes
                    },
                    transaction: transaction
                );

                // Insert each service into the junction table
                foreach (var serviceId in appointmentRequest.ServiceIds)
                {
                    connection.Execute(addAppointmentService, new
                    {
                        AppointmentId = appointmentId,
                        ServiceId = serviceId
                    }, transaction: transaction);
                }

                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        public List<Appointment> GetAllAppointments()
        {
            return dbConnection.Query<Appointment>(getAllAppointments).AsList();
        }

        public List<Appointment> GetAppointmentsByClient(int clientId)
        {
            return dbConnection.Query<Appointment>(appointmentsByClient, new { ClientId = clientId }).AsList();
        }

        public List<Appointment> GetAppointmentsByDate(DateTime appointmentDate)
        {
            return dbConnection.Query<Appointment>(appointmentsByDate, new { AppointmentDate = appointmentDate }).AsList();
        }

        public List<Appointment> GetAppointmentsByTechnician(int technicianId)
        {
            return dbConnection.Query<Appointment>(appointmentsByTechnician, new { TechnicianId = technicianId }).AsList();
        }

        public void RemoveAppointment(int appointmentId)
        {
            dbConnection.Execute(removeAppointment, new
            {
                AppointmentId = appointmentId
            });
        }

       public void ConfirmAppointment(ConfirmAppointmentRequest confirmAppointmentRequest)
        {
            dbConnection.Execute(confirmAppointment, new
            {
                AppointmentId = confirmAppointmentRequest.AppointmentId,
                Status = confirmAppointmentRequest.Status
            });
        }

        #region queries
        private const string addAppointment = @"
            INSERT INTO public.appointments (
                client_id,
                technician_id,
                appointment_date,
                appointment_time,
                duration,
                status,
                notes
            ) VALUES (
                @ClientId,
                @TechnicianId,
                @AppointmentDate,
                @AppointmentTime,
                @Duration,
                @Status,
                @Notes
            ) RETURNING id;
        ";

        private const string addAppointmentService = @"
            INSERT INTO public.appointment_services (appointment_id, service_id)
            VALUES (@AppointmentId, @ServiceId);
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

        private const string confirmAppointment = @"
            UPDATE public.appointments
            SET status = @Status
            WHERE id = @AppointmentId;
        ";
        #endregion
    }
}
