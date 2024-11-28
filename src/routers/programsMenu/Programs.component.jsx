import React, { useState } from 'react';
import { programsData } from '../../data/programData';
import CourseList from '../../components/courses-list/CourseList.Component';

const Programs = ({User}) => {
    const [selectedProgram, setSelectedProgram] = useState('Diploma (2 years)'); // Default program
    const [programs, setPrograms] = useState(programsData); // Store a copy of programsData for state manipulation
    const [editingCourse, setEditingCourse] = useState(null); // Store the course being edited

    // Find selected program details
    const filteredProgram = programs.find(program => program.programType === selectedProgram);
    const filteredCourses = filteredProgram ? filteredProgram.courses : [];

    // Add Course
    const addCourse = (newCourse) => {
        if(selectedProgram==='Diploma (2 years)'){
            programsData[0].courses.push(newCourse)
        }
        else if(selectedProgram==='Post-Diploma (1 year)'){
            programsData[1].courses.push(newCourse)
        }
        else if(selectedProgram==='Certificate (6 months)'){
            programsData[2].courses.push(newCourse)
        }
    };

    // Update Course
    const updateCourse = (updatedCourse) => {
        const updatedPrograms = programs.map(program => {
            if (program.programType === selectedProgram) {
                return {
                    ...program,
                    courses: program.courses.map(course => course.IDCourse === updatedCourse.IDCourse ? updatedCourse : course)
                };
            }
            return program;
        });
        setPrograms(updatedPrograms);
        setEditingCourse(null); // End editing mode
    };

    // Delete Course
    const deleteCourse = (courseID) => {
        const updatedPrograms = programs.map(program => {
            if (program.programType === selectedProgram) {
                return {
                    ...program,
                    courses: program.courses.filter(course => course.IDCourse !== courseID)
                };
            }
            return program;
        });
        setPrograms(updatedPrograms);
    };

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Programs</h1>

            <div className="mb-3">
                <label htmlFor="program-select" className="form-label">Select a program:</label>
                <select
                    id="program-select"
                    className="form-select"
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                >
                    <option value="">--Select a Program--</option>
                    {programs.map((program, index) => (
                        <option key={index} value={program.programType}>{program.programType}</option>
                    ))}
                </select>
            </div>

            {filteredProgram ? (
                <CourseList
                    SelectedProgram={selectedProgram}
                    FilteredCourses={filteredCourses}
                    onAddCourse={addCourse}
                    onEditCourse={setEditingCourse}
                    onDeleteCourse={deleteCourse}
                    editingCourse={editingCourse}
                    onSaveEdit={updateCourse}
                    User={User}
                />
            ) : (
                <p className="text-center">Please select a program to see the details.</p>
            )}
        </div>
    );
};

export default Programs;
