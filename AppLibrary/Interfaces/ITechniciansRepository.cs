
using AppLibrary.Models;

namespace AppLibrary.Interfaces
{
    public interface ITechniciansRepository
    {
        void AddTechnician(string name);
        void RemoveTechnician(int technicianId);
        List<Technician> GetAllTechnicians();
        string GetTechnicianDetails(int technicianId);

    }
}
