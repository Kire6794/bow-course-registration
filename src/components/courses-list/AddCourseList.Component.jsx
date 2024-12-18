import React from 'react'
import AddCourse from './AddCourse.Component'

const AddCourseList = ({SelectedProgram, FilteredCourses, SubmitCourse})=>{

    return(
        <div className="program-section">
          <h2 className="mb-3">Courses for: {SelectedProgram}</h2>
          {FilteredCourses.map((course, courseIndex) => (
            <AddCourse key={course.CourseCode} Course={course} CourseIndex={courseIndex} SubmitCourse={SubmitCourse}></AddCourse>
          ))}
        </div>
    )
}

export default AddCourseList