using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLibrary.Interfaces
{
    public interface ITechniciansRepository
    {
        void AddTechnician(string name);
        void RemoveTechnician(int technicianId);
        List<string> GetAllTechnicians();
        string GetTechnicianDetails(int technicianId);

    }
}
