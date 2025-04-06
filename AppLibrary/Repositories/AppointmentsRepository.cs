using AppLibrary.Interfaces;


namespace AppLibrary.Repositories
{
    public class AppointmentsRepository : IAppointmentsRepository
    {
        public void AddAppointment(DateTime appointmentDate, int technicianId, string clientName, string serviceName)
        {
            throw new NotImplementedException();
        }

        public List<string> GetAllAppointments()
        {
            throw new NotImplementedException();
        }

        public List<string> GetAppointmentsByClient(string clientName)
        {
            throw new NotImplementedException();
        }

        public List<string> GetAppointmentsByDate(DateTime appointmentDate)
        {
            throw new NotImplementedException();
        }

        public List<string> GetAppointmentsByTechnician(int technicianId)
        {
            throw new NotImplementedException();
        }

        public void RemoveAppointment(int appointmentId)
        {
            throw new NotImplementedException();
        }
    }
}
