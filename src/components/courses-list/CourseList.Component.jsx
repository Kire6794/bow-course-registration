import React from 'react';
import Course from './Course.Component'; // Import the Course component from the same folder

const CourseList = ({ SelectedProgram, FilteredCourses, User, onEditCourse, onDeleteCourse }) => {
    return (
        <div className="program-section">
            <h2 className="mb-3">Courses for: {SelectedProgram}</h2>
            {FilteredCourses.map((course, courseIndex) => (
                <div key={course.IDCourse}>
                    <Course Course={course} CourseIndex={courseIndex} />

                    {User.role === 'Admin' && (
                        <div className="admin-actions">
                            <button onClick={() => onEditCourse(course)}>Edit</button>
                            <button onClick={() => onDeleteCourse(course.IDCourse)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CourseList;
