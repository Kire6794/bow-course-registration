import React from 'react'
import Course from './Course.Component'

const CourseList = ({SelectedProgram, FilteredCourses})=>{
    const selectedProgram = SelectedProgram
    const filteredCourses = FilteredCourses
    return(
        <div className="program-section">
          <h2 className="mb-3">Courses for: {selectedProgram}</h2>
          {filteredCourses.map((course, courseIndex) => (
            <Course Course={course} CourseIndex={courseIndex}></Course>
          ))}
        </div>
    )
}

export default CourseList