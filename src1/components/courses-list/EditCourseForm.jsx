import React, { useState } from 'react';

const EditCourseForm = ({ course, onSave }) => {
    const [updatedCourse, setUpdatedCourse] = useState(course);

    const handleChange = (e) => {
        setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(updatedCourse);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="courseName" value={updatedCourse.courseName} onChange={handleChange} placeholder="Course Name" />
            <input type="text" name="courseCode" value={updatedCourse.courseCode} onChange={handleChange} placeholder="Course Code" />
            {/* Add other fields like day, time, delivery mode as necessary */}
            <button type="submit">Save</button>
        </form>
    );
};

export default EditCourseForm;
