import React from 'react';
import { usersData } from '../../data/usersData';

function StudentList() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Student List</h2>

      {/* Header */}
      <div className="container bg-light py-2 border rounded mb-3">
        <div className="row font-weight-bold">
          <div className="col-4">Student</div>
          <div className="col-4">Email</div>
          <div className='col-4'>Program</div>
        </div>
      </div>

      {/*  Students */}
      <div className="container mb-5"> 
        {usersData.length > 0  ? (

          usersData.map((student, index) => (
            // checking if is really a student to print it 
            (student.role==="Student" ? (
            (<div className="row py-2 border-bottom" key={index}>
              <div className="col-4">
                {student.firstName} {student.lastName}
              </div>
              <div className="col-4">{student.email}</div>
              <div className='col-4'>{student.program}</div>
            </div>)
            )
            :
          ("")
          )
          ))
        ) : (
          <p className="text-center">No students available</p>
        )}
      </div>
    </div>
  );
}

export default StudentList;
