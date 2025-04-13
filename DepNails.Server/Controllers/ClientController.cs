using AppLibrary.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DepNails.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController(IClientsRepository clientsRepository) : ControllerBase
    {
        
        [HttpGet]
        public IActionResult GetAllClients()
        {
            var clients = clientsRepository.GetAllClients();
            return Ok(clients);
        }
    }
}
