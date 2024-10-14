import React from "react"

const Course = ({Course,CourseIndex})=>{
    const course =Course
    const courseIndex = CourseIndex

    
    return(
        <div key={courseIndex} className="card mb-3"> {/* Card for each course */}
              <div className="card-header">
                <h5 className="card-title">{course.courseName}</h5>
                <p className="card-subtitle mb-2 text-muted"><strong>Type Term:</strong> {course.typeTerm}</p>
                <p className="card-subtitle mb-2 text-muted"><strong>Code:</strong> {course.codeCourse}</p>
              </div>

              <div className="card-body">
                <p className="card-text"><strong>Description:</strong> {course.description}</p>

                <div className="course-info" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div style={{ textAlign: 'justify'}}>
                    <p><strong>{course.courseDay}</strong></p>
                    <p>{course.courseTime}</p>
                    <p><strong>Start date:</strong> {course.startDate}</p>
                    <p><strong>End date:</strong> {course.endDate}</p>
                  </div>
                  <div style={{ textAlign: 'justify'}}>
                    <p><strong>Campus:</strong> {course.campus}</p>
                    <p><strong>Delivery mode:</strong> {course.deliveryMode}</p>
                    <p><strong>Seats available:</strong> {course.seatsAvailable}</p>
                    <p><strong>Class size:</strong> {course.classSize}</p>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default Course