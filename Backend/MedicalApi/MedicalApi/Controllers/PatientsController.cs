using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicalApi.Data;
using MedicalApi.Model;

namespace MedicalApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly MedicalAPIContext _context;

        public PatientsController(MedicalAPIContext context)
        {
            _context = context;
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patients>>> GetPatients()
        {
          if (_context.Patients == null)
          {
              return NotFound();
          }
            return await _context.Patients.ToListAsync();
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Patients>> GetPatients(int id)
        {
          if (_context.Patients == null)
          {
              return NotFound();
          }
            var patients = await _context.Patients.FindAsync(id);

            if (patients == null)
            {
                return NotFound();
            }

            return patients;
        }

        // PUT: api/Patients/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatients(int id, Patients patients)
        {
            if (id != patients.Id)
            {
                return BadRequest();
            }

            _context.Entry(patients).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Patients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Patients>> PostPatients(Patients patients)
        {
          if (_context.Patients == null)
          {
              return Problem("Entity set 'MedicalAPIContext.Patients'  is null.");
          }
            _context.Patients.Add(patients);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPatients", new { id = patients.Id }, patients);
        }

        // DELETE: api/Patients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatients(int id)
        {
            if (_context.Patients == null)
            {
                return NotFound();
            }
            var patients = await _context.Patients.FindAsync(id);
            if (patients == null)
            {
                return NotFound();
            }

            _context.Patients.Remove(patients);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientsExists(int id)
        {
            return (_context.Patients?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
