import React, { useState } from 'react';
import './addCourses.style.css';

const AddNewCourseForm = ({ SetWasCourseAdded, onAddCourse }) => {
    const [newCourse, setNewCourse] = useState({
        courseName: '',
        courseCode: '',
        typeTerm: '',
        courseDay: '',
        courseTime: '',
        deliveryMode: '',
    });

    const handleInputChange = (e) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
    };

    const handleAddCourse = (e) => {
        e.preventDefault();

        const errors = {};
        if (!newCourse.courseName || !newCourse.courseCode) {
            errors.existingCourse = 'All fields are required!';
            SetWasCourseAdded(false, {}, errors);
            return;
        }

        onAddCourse(newCourse);
        SetWasCourseAdded(true, newCourse);

        setNewCourse({
            courseName: '',
            courseCode: '',
            typeTerm: '',
            courseDay: '',
            courseTime: '',
            deliveryMode: '',
        });
    };

    return (
        <form onSubmit={handleAddCourse}>
            <input
                type="text"
                name="courseName"
                value={newCourse.courseName}
                onChange={handleInputChange}
                placeholder="Course Name"
            />
            <input
                type="text"
                name="courseCode"
                value={newCourse.courseCode}
                onChange={handleInputChange}
                placeholder="Course Code"
            />
            <input
                type="text"
                name="typeTerm"
                value={newCourse.typeTerm}
                onChange={handleInputChange}
                placeholder="Term"
            />
            <input
                type="text"
                name="courseDay"
                value={newCourse.courseDay}
                onChange={handleInputChange}
                placeholder="Day"
            />
            <input
                type="text"
                name="courseTime"
                value={newCourse.courseTime}
                onChange={handleInputChange}
                placeholder="Time"
            />
            <input
                type="text"
                name="deliveryMode"
                value={newCourse.deliveryMode}
                onChange={handleInputChange}
                placeholder="Delivery Mode"
            />
            <button type="submit">Add Course</button>
        </form>
    );
};

export default AddNewCourseForm;
