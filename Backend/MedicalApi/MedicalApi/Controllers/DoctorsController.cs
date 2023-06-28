using MedicalApi.Data;
using MedicalApi.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MedicalApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {

        private readonly MedicalAPIContext _context;

           public DoctorsController(MedicalAPIContext context)
        {
            _context = context;
        }


        // GET: api/<DoctorsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> Get()
        {
            return await _context.Doctor.ToListAsync();
        }

        // GET api/<DoctorsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<DoctorsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<DoctorsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DoctorsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
