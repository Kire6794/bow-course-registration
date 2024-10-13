import React from 'react';
import './Profile.style.css';
import { Link } from 'react-router-dom'; // Importa Link
// import { usersData } from '../../data/usersData';

// passing the value as props
const ProfileBar =({isVisibleP,user})=>{

    //check the user if no user role as guest
    // const selectedUser = usersData[1] || {role:'Guest'};


    return (
        <div>
            <div className={`profileBar ${isVisibleP ? 'profileBar--visible': ''}`}>
                <ul className='profileBar__list'>
                    <li className={`profileBar__item profileBar__item--dashboard ${user.role === 'Admin' || user.role === 'Student' ? 'profileBar__item--dashboard--Visible' : ''}`}>
                        <Link className='profileBar__link' to="/dashboard">Dashboard</Link>
                    </li>
                    <li className={`profileBar__item profileBar__item--profiles ${user.role === 'Admin' || user.role === 'Student' ? 'profileBar__item--profiles--Visible' : ''}`}>
                        <Link className='profileBar__link' to="/profiles">Profiles</Link>
                    </li>
                    <li className={`profileBar__item admin ${user.role === 'Admin' ? 'profileBar__item--visible': ''} `}>
                        <Link className='profileBar__link' to="/student-list">Student List</Link>
                    </li>
                    <li className={`profileBar__item admin ${user.role ==='Admin' ? 'profileBar__item--visible':''}`}>
                        <Link className='profileBar__link' to="/forms">Forms</Link>
                    </li>
                    <li className={`profileBar__item profileBar__item--login ${user.role === 'Admin'|| user.role==='Student' ? 'profileBar__item--login--noVisible' : ''}`}>
                        <Link className='profileBar__link' to="/login">Login</Link>
                    </li>
                    <li className={`profileBar__item profileBar__item--login ${user.role === 'Admin'|| user.role==='Student' ? 'profileBar__item--login--noVisible' : ''}`}>
                        <Link className='sideBar__link' to="/signUp">Sing Up</Link>
                    </li>
                </ul>
                
            </div>
        </div>
    );
    
}

export default ProfileBar;