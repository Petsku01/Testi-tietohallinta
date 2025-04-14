// Ei oikeaan käyttöön
// Testi frontend
//simple


import React, { useState } from 'react';
import axios from 'axios';

interface Patient {
  id: number;
  name: string;
  diagnoses: string[];
  note: string;
}

const PatientModule: React.FC = () => {
  const [patientId, setPatientId] = useState<string>('1');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [newNote, setNewNote] = useState<string>('');

  const fetchPatient = async () => {
    try {
      const response = await axios.get<Patient>(`https://localhost:5001/api/patient/${patientId}`);
      setPatient(response.data);
      setNewNote(response.data.note || '');
    } catch (error) {
      alert('Potilasta ei löydy!');
    }
  };

  const saveNote = async () => {
    try {
      await axios.post(`https://localhost:5001/api/patient/${patientId}/note`, newNote, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Muistiinpano tallennettu!');
    } catch (error) {
      alert('Muistiinpanon tallennus epäonnistui!');
    }
  };

  return (
    <div style={{ padding: '20px', width: '800px', margin: 'auto' }}>
      <h2>Potilastiedot</h2>
      <div>
        <label>
          Potilaan ID:
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            style={{ marginLeft: '10px', width: '80px' }}
          />
        </label>
        <button onClick={fetchPatient} style={{ marginLeft: '10px' }}>
          Hae
        </button>
      </div>
      {patient && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Nimi:</strong> {patient.name}</p>
          <p><strong>Diagnoosit:</strong> {patient.diagnoses.join(', ')}</p>
          <p><strong>Muistiinpano:</strong></p>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            style={{ width: '100%', height: '80px' }}
          />
          <button onClick={saveNote} style={{ marginTop: '10px' }}>
            Tallenna muistiinpano
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientModule;

