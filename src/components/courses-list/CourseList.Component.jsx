import React, { useState } from 'react';
import Course from './Course.Component';

const CourseList = ({ SelectedProgram, FilteredCourses, onAddCourse, onEditCourse, onDeleteCourse, editingCourse, onSaveEdit, User }) => {
    const [newCourse, setNewCourse] = useState({
        IDCourse: '',
        courseName: '',
        typeTerm: '',
        codeCourse: '',
        description: '',
        courseDay: '',
        courseTime: '',
        campus: '',
        deliveryMode: '',
        seatsAvailable: '',
        classSize: ''
    });

    const handleNewCourseChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    const handleAddCourse = () => {
        onAddCourse({ ...newCourse, IDCourse: Date.now().toString() }); // Generate unique ID for new course
        setNewCourse({
            IDCourse: '',
            courseName: '',
            typeTerm: '',
            codeCourse: '',
            description: '',
            courseDay: '',
            courseTime: '',
            campus: '',
            deliveryMode: '',
            seatsAvailable: '',
            classSize: ''
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        onEditCourse({ ...editingCourse, [name]: value });
    };

    const handleSaveEdit = () => {
        onSaveEdit(editingCourse);
    };

    return (
        <div className="program-section">
            <h2 className="mb-3">Courses for: {SelectedProgram}</h2>

            {/* Add New Course Form */}
            {User.role === "Admin" ? (
            <div className="add-course-form mb-3">
                <input
                    type="text"
                    name="courseName"
                    placeholder="Course Name"
                    value={newCourse.courseName}
                    onChange={handleNewCourseChange}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="typeTerm"
                    placeholder="Type Term (e.g., Spring)"
                    value={newCourse.typeTerm}
                    onChange={handleNewCourseChange}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="codeCourse"
                    placeholder="Course Code"
                    value={newCourse.codeCourse}
                    onChange={handleNewCourseChange}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newCourse.description}
                    onChange={handleNewCourseChange}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="courseDay"
                    placeholder="Course Day (e.g., Monday)"
                    value={newCourse.courseDay}
                    onChange={handleNewCourseChange}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="courseTime"
                    placeholder="Course Time (e.g., 10:00 AM - 12:00 PM)"
                    value={newCourse.courseTime}
                    onChange={handleNewCourseChange}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="campus"
                    placeholder="Campus (e.g., Downtown Campus)"
                    value={newCourse.campus}
                    onChange={handleNewCourseChange}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="deliveryMode"
                    placeholder="Delivery Mode (e.g., Online)"
                    value={newCourse.deliveryMode}
                    onChange={handleNewCourseChange}
                    className="form-control mb-2"
                />
                <input
                    type="number"
                    name="seatsAvailable"
                    placeholder="Seats Available"
                    value={newCourse.seatsAvailable}
                    onChange={handleNewCourseChange}
                    className="form-control mb-2"
                />
                <input
                    type="number"
                    name="classSize"
                    placeholder="Class Size"
                    value={newCourse.classSize}
                    onChange={handleNewCourseChange}
                    className="form-control mb-2"
                />
                <button onClick={handleAddCourse} className="btn btn-primary">Add New Course</button>
            </div>
            )
        :
        null}

            {/* Display Course List */}
            {FilteredCourses.map((course) => (
                <div key={course.IDCourse} className="course-item mb-3">
                    {editingCourse?.IDCourse === course.IDCourse ? (
                        // Edit Mode
                        <>
                            <input
                                type="text"
                                name="courseName"
                                placeholder="Course Name"
                                value={editingCourse.courseName}
                                onChange={handleEditChange}
                                className="form-control mb-2"
                            />
                            {/* Other input fields for editing */}
                            {User.role ==="Admin" ? (
                                <>
                            <button onClick={handleSaveEdit} className="btn btn-success">Save</button>
                            <button onClick={() => onEditCourse(null)} className="btn btn-secondary ml-2">Cancel</button>
                            </>
                        ):
                        null}
                        </>
                    ) : (
                        // View Mode
                        <>
                            <Course Course={course} />
                            {User.role === "Admin" ? (
                            <div className="admin-actions mt-2">
                                <button onClick={() => onEditCourse(course)} className="btn btn-warning mx-1">Edit</button>
                                <button onClick={() => onDeleteCourse(course.IDCourse)} className="btn btn-danger mx-1">Delete</button>
                            </div>
                            ):
                            null}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CourseList;
