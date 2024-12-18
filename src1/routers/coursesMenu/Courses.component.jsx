import React, { useState } from 'react';
import { programsData } from '../../data/programData';


const Courses = () => {
  const [selectedProgram, setSelectedProgram] = useState(''); // Para manejar el programa seleccionado

  // Obtener los nombres de los programas para el filtro
  const programNames = programsData.map(program => program.programName);

  // Filtrar cursos por programa seleccionado
  const filteredCourses = selectedProgram
    ? programsData.find(program => program.programName === selectedProgram)?.courses
    : [];

  return (
    <div className="container my-4"style={{ display: 'flex', flexDirection: 'column' }}> {/* Bootstrap container for padding */}
      <h1 className="text-center mb-4">Courses</h1> {/* Centered title */}
      
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

      {selectedProgram && filteredCourses.length > 0 ? (
        <div className="program-section">
          <h2 className="mb-3">Courses for: {selectedProgram}</h2>
          {filteredCourses.map((course, courseIndex) => (
            <div key={courseIndex} className="card mb-3"> {/* Card for each course */}
              <div className="card-header">
                <h5 className="card-title">{course.courseName}</h5>
                <p className="card-subtitle mb-2 text-muted"><strong>Type Term:</strong> {course.typeTerm}</p>
                <p className="card-subtitle mb-2 text-muted"><strong>Code:</strong> {course.codeCourse}</p>
              </div>

              <div className="card-body">
                <p className="card-text"><strong>Description:</strong> {course.description}</p>

                <div className="course-info" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div style={{ textAlign: 'justify'}}>
                    <p><strong>{course.courseDay}</strong></p>
                    <p>{course.courseTime}</p>
                    <p><strong>Start date:</strong> {course.startDate}</p>
                    <p><strong>End date:</strong> {course.endDate}</p>
                  </div>
                  <div style={{ textAlign: 'justify'}}>
                    <p><strong>Campus:</strong> {course.campus}</p>
                    <p><strong>Delivery mode:</strong> {course.deliveryMode}</p>
                    <p><strong>Seats available:</strong> {course.seatsAvailable}</p>
                    <p><strong>Class size:</strong> {course.classSize}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Please select a program to see the courses.</p> // Centered message
      )}
    </div>
  );
};

export default Courses;
