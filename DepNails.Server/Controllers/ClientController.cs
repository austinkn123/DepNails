using AppLibrary.Interfaces;
using AppLibrary.Models;
using Microsoft.AspNetCore.Mvc;

namespace DepNails.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController(IClientsRepository clientsRepository) : ControllerBase
    {
        
        [HttpGet]
        [Route("all")]
        public IActionResult GetAllClients()
        {
            var clients = clientsRepository.GetAllClients();
            return Ok(clients);
        }

        [HttpGet("{id}")]
        public IActionResult GetClientById(int id)
        {
            var client = clientsRepository.GetClient(id);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }

        [HttpPost]
        [Route("add")]
        public IActionResult AddClient([FromBody] Client client)
        {
            if (client == null)
            {
                return BadRequest("Client data is required");
            }
            clientsRepository.AddClient(client);
            return Ok("Client added successfully");
        }

        [HttpDelete]
        [Route("remove/{id}")]
        public IActionResult RemoveClient(int id)
        {
            var client = clientsRepository.GetClient(id);
            if (client == null)
            {
                return NotFound();
            }
            clientsRepository.RemoveClient(id);
            return Ok("Client removed successfully");
        }
    }
}
