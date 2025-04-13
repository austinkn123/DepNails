
using AppLibrary.Models;

namespace AppLibrary.Interfaces
{
    public interface ITechniciansRepository
    {
        List<Technician> GetAllTechnicians();
        Technician? GetTechnicianById(int id);

    }
}
