using AppLibrary.Interfaces;
using AppLibrary.Models;
using Dapper;
using System.Data;
using System.Data.Common;

namespace AppLibrary.Repositories
{
    public class SchedulingRepository(IDbConnection dbConnection) : ISchedulingRepository
    {
        public List<Appointment> GetAllAppointments()
        {
            return dbConnection.Query<Appointment>(getAllAppointments).AsList();
        }

        public List<Appointment> GetAppointmentsByClient(int clientId)
        {
            return dbConnection.Query<Appointment>(appointmentsByClient, new { ClientId = clientId }).AsList();
        }

        public List<Appointment> GetAppointmentsByDate(DateTime bookingDate)
        {
            return dbConnection.Query<Appointment>(appointmentsByDate, new { BookingDate = bookingDate }).AsList();
        }

        public List<Appointment> GetAppointmentsByTechnician(int technicianId)
        {
            return dbConnection.Query<Appointment>(appointmentsByTechnician, new { TechnicianId = technicianId }).AsList();
        }

        public void ScheduleAppointment(AppointmentRequest appointmentRequest)
        {
            using var transaction = dbConnection.BeginTransaction();

            try
            {
                // Insert into appointments and get the new ID
                var appointmentId = dbConnection.ExecuteScalar<int>(
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

                // Insert services for the appointment
                foreach (var svc in appointmentRequest.Services)
                {
                    dbConnection.Execute(
                        addServiceSql,
                        new
                        {
                            svc.ServiceName,
                            svc.Description,
                            svc.Duration,
                            svc.Price,
                            AppointmentId = appointmentId
                        },
                        transaction: transaction
                    );
                }

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                // Log the exception (if logging is set up)
                throw new InvalidOperationException("An error occurred while scheduling the appointment.", ex);
            }
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
                confirmAppointmentRequest.AppointmentId,
                confirmAppointmentRequest.Status
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

        const string addServiceSql = @"
        INSERT INTO public.services (
            service_name,
            description,
            duration,
            price,
            appointment_id
        ) VALUES (
            @ServiceName,
            @Description,
            @Duration,
            @Price,
            @AppointmentId
        );
    ";

        private const string getAllAppointments = @"
            SELECT id, 
                    client_id,
                    technician_id, 
                    appointment_date,
                    appointment_time, 
                    duration, 
                    status, 
                    notes
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
                    notes
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
                    notes
            FROM public.appointments
            WHERE appointment_date = @BookingDate;
        ";

        private const string appointmentsByTechnician = @"
            SELECT id, 
                    client_id,
                    technician_id, 
                    appointment_date,
                    appointment_time, 
                    duration, 
                    status, 
                    notes
            FROM public.appointments
            WHERE technician_id = @TechnicianId;
        ";

        private const string removeAppointment = @"
            DELETE FROM public.services
            WHERE appointment_id = @AppointmentId;

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
