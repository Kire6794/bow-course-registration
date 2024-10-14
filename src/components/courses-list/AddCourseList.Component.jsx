import React from 'react'
import AddCourse from './AddCourse.Component'

const AddCourseList = ({SelectedProgram, FilteredCourses,User, SetUser, SetWasCourseAdded})=>{



    return(
        <div className="program-section">
          <h2 className="mb-3">Courses for: {SelectedProgram}</h2>
          {FilteredCourses.map((course, courseIndex) => (
            <AddCourse key={course.IDCourse} Course={course} CourseIndex={courseIndex} User={User} SetUser = {SetUser} SetWasCourseAdded={SetWasCourseAdded}></AddCourse>
          ))}
        </div>
    )
}

export default AddCourseList