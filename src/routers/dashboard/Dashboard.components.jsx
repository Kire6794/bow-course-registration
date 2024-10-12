import React from 'react';
import { usersData } from '../../data/usersData';
import './Dashboard.style.css'; 
// here i need to find the way to import the selected user as user in the prop
const Dashboard=({user})=>{
  // selectedUser is working to import manually the user 
  const selectedUser = usersData[0];
  return(
      <div className='dashboard'>
        <h2 className='dashboard__title'>Welcome to your Dashboard</h2>        
        <div className='dashboard__container container'>
          <p className='dashboard__greeting'>Hello, {selectedUser.firstName}</p>
          <p className='dashboard__role'>You are {selectedUser.role === 'Student' ? 'a' : 'an'} {selectedUser.role} user.</p>
          <p className='dashboard__department'>Department: {selectedUser.department}</p>
          <p className='dashboard__program'>Program:{selectedUser.program}</p>
        </div>
        
      </div>
  )
}

export default Dashboard;