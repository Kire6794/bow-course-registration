import React from 'react';
// import { usersData } from '../../data/usersData';
import './Dashboard.style.css'; 
// here i need to find the way to import the selected user as user in the prop
const Dashboard=({User})=>{
  // selectedUser is working to import manually the user 
  // const selectedUser = usersData[0];
  return(
      <div className='dashboard'>
        <h2 className='dashboard__title'>Welcome to your Dashboard</h2>        
        <div className='dashboard__container container'>
          <p className='dashboard__greeting'>Hello, {User.firstName}</p>
          <p className='dashboard__role'>You are {User.role === 'Student' ? 'a' : 'an'} {User.role} user.</p>
          <p className='dashboard__email'>Your email: {User.email}</p>
          <p className='dashboard__department'>Department: {User.department}</p>
          <p className={`dashboard__program ${User.role === 'Admin' ? 'dashboard__program--visible':''}`}>Program:{User.program}</p>
        </div>
        
      </div>
  )
}

export default Dashboard;