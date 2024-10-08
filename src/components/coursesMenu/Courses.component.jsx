import React, { useState } from 'react';
import { programsData } from '../data/programData';
import './Courses.style.css'; // Asegúrate de tener tu CSS para estilos

const Courses = () => {
  const [selectedProgram, setSelectedProgram] = useState(''); // Para manejar el programa seleccionado

  // Obtener los nombres de los programas para el filtro
  const programNames = programsData.map(program => program.programName);

  // Filtrar cursos por programa seleccionado
  const filteredCourses = selectedProgram
    ? programsData.find(program => program.programName === selectedProgram)?.courses
    : [];

  return (
    <div className="courses-container">
      <h1>Courses</h1>
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

      {selectedProgram && filteredCourses.length > 0 ? (
        <div className="program-section">
          <h2>Courses for: {selectedProgram}</h2>
          {filteredCourses.map((course, courseIndex) => (
            <div key={courseIndex} className="course-card">
              <div className="course-header">
                <h3>{course.courseName}</h3>
                <p><strong>Type Term:</strong> {course.typeTerm}</p>
                <p><strong>Code:</strong> {course.codeCourse}</p>
              </div>

              <div className="course-body">
                <p><strong>Description:</strong> {course.description}</p>

                <div className="course-info">
                  <div>
                    <p><strong>{course.courseDay}</strong></p>
                    <p>{course.courseTime}</p>
                    <p><strong>Start date:</strong> {course.startDate}</p>
                    <p><strong>End date:</strong> {course.endDate}</p>
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
        <p>Please select a program to see the courses.</p>
      )}
    </div>
  );
};

export default Courses;
