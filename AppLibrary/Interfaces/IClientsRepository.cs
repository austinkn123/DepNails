using AppLibrary.Models;

namespace AppLibrary.Interfaces
{
    public interface IClientsRepository
    {
        void AddClient(Client client);
        void RemoveClient(int id);
        List<Client> GetAllClients();
        Client  GetClient(int id);
    }
}
