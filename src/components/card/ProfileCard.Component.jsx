import React from 'react'

const ProfileCard = (props)=>{

    const User = props.User
    /*
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phone: '',
    birthday: '',
    department: '',
    program: '',
    username: '',
    password: ''
    */

    return(
            <div className='container my-4'>
                <p className="card-text"><strong>Profile:</strong></p>

                <div className="course-info" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div style={{ textAlign: 'justify'}}>
                    <p><strong>Student: </strong> {User.firstName}{" "}{User.lastName}</p>
                    <p><strong>Email:</strong> {User.email}</p>
                    <p><strong>Phone:</strong> {`(${User.countryCode}) ${User.phone}`}</p>
                  </div>
                  <div style={{ textAlign: 'justify'}}>
                    <p><strong>BOD:</strong> {User.birthday}</p>
                    <p><strong>Enrolled Dept:</strong> {User.department}</p>
                    <p><strong>Enrolled Program:</strong> { User.role === "Student"?User.program :"NA"}</p>
                    
                  </div>
                </div>
            </div>

    )
}

export default ProfileCard

