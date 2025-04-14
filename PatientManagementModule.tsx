// Ei oikeaan käyttöön
// Testi frontend
// Virhe löytyy

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Potilastietomalli
interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  diagnoses: string[];
  notes: string[];
}

const PatientManagementModule: React.FC = () => {
  const [patientId, setPatientId] = useState<number>(1); // Oletus: potilas ID 1
  const [patient, setPatient] = useState<Patient | null>(null);
  const [newNote, setNewNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Hae potilaan tiedot
  const fetchPatient = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Patient>(`https://localhost:5001/api/patient/${patientId}`);
      setPatient(response.data);
    } catch (error) {
      console.error('Virhe potilastietojen haussa:', error);
      alert('Potilasta ei löydy!');
    }
    setLoading(false);
  };

  // Lisää muistiinpano
  const addNote = async () => {
    if (!newNote) return;
    try {
      await axios.post(`https://localhost:5001/api/patient/${patientId}/notes`, newNote, {
        headers: { 'Content-Type': 'application/json' },
      });
      setNewNote('');
      fetchPatient(); // Päivitä tiedot
    } catch (error) {
      console.error('Virhe muistiinpanon lisäyksessä:', error);
      alert('Muistiinpanon lisäys epäonnistui!');
    }
  };

  // Hae Tiedot komponentin latautuessa
  useEffect(() => {
    fetchPatient();
  }, [patientId]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <h2>Potilastietojen hallintamoduuli</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px' }}>
          Potilaan ID:
          <input
            type="number"
            value={patientId}
            onChange={(e) => setPatientId(Number(e.target.value))}
            style={{ marginLeft: '10px', width: '100px', padding: '5px' }}
          />
        </label>
        <button
          onClick={fetchPatient}
          disabled={loading}
          style={{ marginLeft: '10px', padding: '5px 15px' }}
        >
          Hae potilas
        </button>
      </div>

      {loading && <p>Ladataan...</p>}
      {patient && (
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Potilaan perustiedot */}
          <div style={{ flex: '1', border: '1px solid #ccc', padding: '15px' }}>
            <h3>{patient.name}</h3>
            <p><strong>Syntymäaika:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Diagnoosit:</strong></p>
            <ul>
              {patient.diagnoses.map((diagnosis, index) => (
                <li key={index}>{diagnosis}</li>
              ))}
            </ul>
          </div>

          {/* Muistiinpanot */}
          <div style={{ flex: '2', border: '1px solid #ccc', padding: '15px' }}>
            <h4>Muistiinpanot</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                    Muistiinpano
                  </th>
                </tr>
              </thead>
              <tbody>
                {patient.notes.map((note, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '20px' }}>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Lisää muistiinpano..."
                style={{ width: '100%', height: '100px', padding: '5px' }}
              />
              <button
                onClick={addNote}
                disabled={!newNote}
                style={{ marginTop: '10px', padding: '5px 15px' }}
              >
                Lisää muistiinpano
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagementModule;
