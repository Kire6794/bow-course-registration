import React from 'react';

const StudentCourses = ({ User,SetUser }) => {

  const removeCourse = (codeCourse) =>{
    //in react when i use setUser inside a function, recives the actual user as prevUser
    SetUser((prevUser)=>({

      //im passing the prevUser as the state just before changing it,so i create a copy with the spreed operator
            //just to change a propertie and save the others
      ...prevUser,
      courses: prevUser.courses.filter((course)=>course.codeCourse !== codeCourse),
    }))
  }


  return (
    <div className="container my-4" style={{ display: 'flex', flexDirection: 'column' }}> 
      <h1 className="text-center mb-4">Student courses</h1> 
      
      <h2 className="mb-4 text-center">{User.firstName} {User.lastName}</h2>
      <h3 className="mb-4 text-center">Program: {User.program}</h3>

      {User.courses.length > 0 ? (
        <div className="program-section">
          <h2 className="mb-3">Your courses:</h2>
          {User.courses.map((course, index) => (
            <div key={index} className="card mb-3">
              <div className="card-header">
                <h5 className="card-title">{course.courseName} ({course.codeCourse})</h5>
                <p className="card-subtitle mb-2 text-muted"><strong>Code:</strong> {course.codeCourse}</p>
              </div>

              <div className="card-body">

                <div className="course-info" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div style={{ textAlign: 'justify' }}>
                    <p><strong>Day:</strong> {course.courseDay}</p>
                    <p><strong>Time:</strong> {course.courseTime}</p>
                    <p><strong>Delivery Mode:</strong> {course.deliveryMode}</p>
                  </div>
                </div>
                {/* i have to pass the function onClick like this: ()=>removeCourse.... to prevent the execution of it in the first render. */}
                <button className='btn btn-danger mt-3' onClick={()=>removeCourse(course.codeCourse)}>Drop course</button>
                
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
