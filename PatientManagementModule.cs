// Ei vastaa mitää oikeata järjestelmää
// tehty testi mielessä ja opiskelussa
// ei toimi
//backend


using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace PatientModule.Controllers
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> Diagnoses { get; set; }
        public string Note { get; set; }
    }

    public static class InMemoryDatabase
    {
        public static List<Patient> Patients = new List<Patient>
        {
            new Patient
            {
                Id = 1,
                Name = "Matti Meikäläinen",
                Diagnoses = new List<string> { "Hypertensio", "Diabetes" },
                Note = "Tarkista verenpaine 10/2025"
            }
        };
    }

    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        [HttpGet("{id}")]
        public ActionResult<Patient> GetPatient(int id)
        {
            var patient = InMemoryDatabase.Patients.FirstOrDefault(p => p.Id == id);
            if (patient == null)
                return NotFound();
            return Ok(patient);
        }

        [HttpPost("{id}/note")]
        public ActionResult AddNote(int id, [FromBody] string note)
        {
            var patient = InMemoryDatabase.Patients.FirstOrDefault(p => p.Id == id);
            if (patient == null)
                return NotFound();
            patient.Note = note;
            return Ok();
        }
    }
}
