

namespace AppLibrary.Models
{
    public class AppointmentRequest
    {
        public int ClientId { get; set; }
        public int TechnicianId { get; set; }
        public DateTime AppointmentDate { get; set; } // or use Date + Time separately
        public TimeSpan AppointmentTime { get; set; }
        public int Duration { get; set; }
        public string Status { get; set; } = "pending";
        public string? Notes { get; set; }
        public List<int> ServiceIds { get; set; } = new();
    }

    public class ConfirmAppointmentRequest
    {
        public int AppointmentId { get; set; }
        public string Status { get; set; } = "confirmed";
    }

    public class Appointment
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int TechnicianId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public TimeSpan AppointmentTime { get; set; }
        public int? Duration { get; set; }
        public string? Status { get; set; }
        public string? Notes { get; set; }
        public bool Paid { get; set; }
    }
}
