using AppLibrary.Interfaces;


namespace AppLibrary.Repositories
{
    public class TechniciansRepository : ITechniciansRepository
    {
        private readonly string _connectionString;

        public TechniciansRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddTechnician(string name)
        {
            throw new NotImplementedException();
        }

        public List<string> GetAllTechnicians()
        {
            throw new NotImplementedException();
        }

        public string GetTechnicianDetails(int technicianId)
        {
            throw new NotImplementedException();
        }

        public void RemoveTechnician(int technicianId)
        {
            throw new NotImplementedException();
        }
    }
}
