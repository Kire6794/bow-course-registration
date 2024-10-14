import React from 'react'
import Course from './Course.Component'

const CourseList = ({SelectedProgram, FilteredCourses})=>{

    return(
        <div className="program-section">
          <h2 className="mb-3">Courses for: {SelectedProgram}</h2>
          {FilteredCourses.map((course, courseIndex) => (
            <Course key={course.IDCourse} Course={course} CourseIndex={courseIndex}></Course>
          ))}
        </div>
    )
}

export default CourseList