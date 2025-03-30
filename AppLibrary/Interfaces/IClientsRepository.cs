using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLibrary.Interfaces
{
    public interface IClientsRepository
    {
        void AddClient(string name);
        void RemoveClient(string name);
        List<string> GetAllClients();
    }
}
