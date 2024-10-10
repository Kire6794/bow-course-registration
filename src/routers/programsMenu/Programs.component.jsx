import React, { useState } from 'react';
import { programsData } from '../../data/programData';
import './Programs.style.css'; // Asegúrate de tener tu CSS para estilos

const Programs = () => {
  const [selectedProgram, setSelectedProgram] = useState(''); // Para manejar el programa seleccionado

  // Obtener los nombres de los programas para el filtro
  const programNames = programsData.map(program => program.programName);

  // Filtrar programa seleccionado
  const filteredProgram = selectedProgram
    ? programsData.find(program => program.programName === selectedProgram)
    : null;

  return (
    <div className="container my-4" style={{ display: 'flex', flexDirection: 'column' }}> {/* Bootstrap container for padding */}
      <h1 className="text-center mb-4">Programs</h1> {/* Centered title */}
      
      <div className="mb-3">
        <label htmlFor="program-select" className="form-label">Select a program:</label>
        <select
          id="program-select"
          className="form-select"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
        >
          <option value="">--Select a Program--</option>
          {programNames.map((program, index) => (
            <option key={index} value={program}>{program}</option>
          ))}
        </select>
      </div>

      {filteredProgram ? (
        <div className="card mb-3"> {/* Card for the selected program */}
          <div className="card-header">
            <h2 className="card-title">{filteredProgram.programName}</h2>
          </div>
          <div className="card-body">
            <p className="card-text"><strong>Description:</strong> {filteredProgram.programDescription}</p>
          </div>
        </div>
      ) : (
        <p className="text-center">Please select a program to see the details.</p> // Centered message
      )}
    </div>
  );
};

export default Programs;
