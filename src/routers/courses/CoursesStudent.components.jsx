import React, { useState, useEffect } from 'react';
import { getData, deleteData } from '../../utilities/fetchOps';

const StudentCourses = ({ User }) => {
  
  const[userCourses, setUserCourses] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(()=>{
    const getStudentCourses = async ()=>{
      const url = `http://localhost:5000/api/v1/mycourses/${User.userID}`
      console.log(User.userID)
      const response = await getData(url)
      if (response.submissionError ) console.log(response.submissionError)
      else if(response.data) setUserCourses(response.data.courses)     
    }
    
    if(!isNaN(User.userID) && userCourses.length === 0) getStudentCourses()
      
    },[User])

  const removeCourse = async (courseCode) =>{
    const url = `http://localhost:5000/api/v1/dropcourse/${User.userID}/?courseCode=${courseCode}`
    const response = await deleteData(url)
    if (response.submissionError ) {
      console.log(response.submissionError)
      setErrors(response)
    }
    else if(response.data) {  
      const newCoursesList = userCourses.filter((course)=> course.CourseCode[0] !== courseCode)
      console.log(newCoursesList)
      setUserCourses(newCoursesList)
    }
 
  }


  return (
    <div className="container my-4" style={{ display: 'flex', flexDirection: 'column' }}> 
      <h1 className="text-center mb-4">Student courses</h1> 
      
      <h2 className="mb-4 text-center">{User.firstName} {User.lastName}</h2>
      <h3 className="mb-4 text-center">Program: {User.program}</h3>

      {User.program? (
        <div className="program-section">
          <h2 className="mb-3">Your courses:</h2>
          {userCourses.length > 0 && userCourses.map((course, index) => (
            <div key={index} className="card mb-3">
              <div className="card-header">
                <h5 className="card-title">{course.CourseName} ({course.CourseCode[0]})</h5>
                <p className="card-subtitle mb-2 text-muted"><strong>Code:</strong> {course.codeCourse}</p>
              </div>

              <div className="card-body">

                <div className="course-info" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div style={{ textAlign: 'justify' }}>
                    <p><strong>Day:</strong> {course.CourseDay}</p>
                    <p><strong>Time:</strong> {course.CourseTime}</p>
                    <p><strong>Delivery Mode:</strong> {course.DeliveryMode}</p>
                  </div>
                </div>
                {/* i have to pass the function onClick like this: ()=>removeCourse.... to prevent the execution of it in the first render. */}
                <button className='btn btn-danger mt-3' onClick={()=>removeCourse(course.CourseCode[0])}>Drop course</button>
                
              </div>
            </div>
          ))}
        </div>
      ) 
      : 
      (
        <p className="text-center">You don't have any courses available.</p> 
      )}
    </div>
  );
};

export default StudentCourses;
