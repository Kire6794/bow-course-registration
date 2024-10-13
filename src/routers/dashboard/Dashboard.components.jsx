import React from 'react';
// import { usersData } from '../../data/usersData';
import './Dashboard.style.css'; 
// here i need to find the way to import the selected user as user in the prop
const Dashboard=({user})=>{
  // selectedUser is working to import manually the user 
  // const selectedUser = usersData[0];
  return(
      <div className='dashboard'>
        <h2 className='dashboard__title'>Welcome to your Dashboard</h2>        
        <div className='dashboard__container container'>
          <p className='dashboard__greeting'>Hello, {user.firstName}</p>
          <p className='dashboard__role'>You are {user.role === 'Student' ? 'a' : 'an'} {user.role} user.</p>
          <p className='dashboard__email'>Your email: {user.email}</p>
          <p className='dashboard__department'>Department: {user.department}</p>
          <p className={`dashboard__program ${user.role === 'Admin' ? 'dashboard__program--visible':''}`}>Program:{user.program}</p>
        </div>
        
      </div>
  )
}

export default Dashboard;