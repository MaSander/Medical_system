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
    public class MedicationsController : ControllerBase
    {
        private readonly MedicalAPIContext _context;

        public MedicationsController(MedicalAPIContext context)
        {
            _context = context;
        }

        // GET: api/Medications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Medications>>> GetMedications()
        {
          if (_context.Medications == null)
          {
              return NotFound();
          }
            return await _context.Medications.ToListAsync();
        }

        // GET: api/Medications/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Medications>> GetMedications(int id)
        {
          if (_context.Medications == null)
          {
              return NotFound();
          }
            var medications = await _context.Medications.FindAsync(id);

            if (medications == null)
            {
                return NotFound();
            }

            return medications;
        }

        // PUT: api/Medications/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedications(int id, Medications medications)
        {
            if (id != medications.Id)
            {
                return BadRequest();
            }

            _context.Entry(medications).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicationsExists(id))
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

        // POST: api/Medications
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Medications>> PostMedications(Medications medications)
        {
          if (_context.Medications == null)
          {
              return Problem("Entity set 'MedicalAPIContext.Medications'  is null.");
          }
            _context.Medications.Add(medications);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedications", new { id = medications.Id }, medications);
        }

        // DELETE: api/Medications/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedications(int id)
        {
            if (_context.Medications == null)
            {
                return NotFound();
            }
            var medications = await _context.Medications.FindAsync(id);
            if (medications == null)
            {
                return NotFound();
            }

            _context.Medications.Remove(medications);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MedicationsExists(int id)
        {
            return (_context.Medications?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
