

namespace AppLibrary.Interfaces
{
    public interface IClientsRepository
    {
        void AddClient(string name);
        void RemoveClient(string name);
        List<string> GetAllClients();
    }
}
