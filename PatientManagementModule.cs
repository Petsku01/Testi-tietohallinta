// Ei vastaa mitää oikeata järjestelmää
// tehty testi mielessä ja opiskelussa
// ei toimi

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientManagementModule.Controllers
{
    // Potilastietomalli
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public List<string> Diagnoses { get; set; }
        public List<string> Notes { get; set; }
    }

    // Simuloitu tietokanta (oikeassa järjestelmässä SQL-tietokanta)
    public static class InMemoryDatabase
    {
        public static List<Patient> Patients = new List<Patient>
        {
            new Patient
            {
                Id = 1,
                Name = "Matti Meikäläinen",
                DateOfBirth = new DateTime(1970, 5, 15),
                Diagnoses = new List<string> { "Hypertensio", "Diabetes" },
                Notes = new List<string> { "Tarkista verenpaine 10/2025" }
            }
        };
    }

    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        // Hae potilaan tiedot ID:n perusteella
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            var patient = InMemoryDatabase.Patients.FirstOrDefault(p => p.Id == id);
            if (patient == null)
                return NotFound();
            return Ok(patient);
        }

        // Lisää muistiinpano potilaalle
        [HttpPost("{id}/notes")]
        public async Task<ActionResult> AddNote(int id, [FromBody] string note)
        {
            var patient = InMemoryDatabase.Patients.FirstOrDefault(p => p.Id == id);
            if (patient == null)
                return NotFound();
            patient.Notes.Add(note);
            return Ok();
        }
    }
}
