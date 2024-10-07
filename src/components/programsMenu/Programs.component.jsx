import React, { useState } from 'react';
import { programsData } from '../data/programData';
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
    <div className="programs-container">
      <h1>Programs</h1>
      <div className="filter-section">
        <label htmlFor="program-select">Select a program:</label>
        <select
          id="program-select"
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
        <div className="course-header">
          <h2>{filteredProgram.programName}</h2>
          <p><strong>Description:</strong> {filteredProgram.programDescription}</p>
        </div>
      ) : (
        <p>Please select a program to see the details.</p>
      )}
    </div>
  );
};

export default Programs;
