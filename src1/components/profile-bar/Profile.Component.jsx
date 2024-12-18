import React from 'react';
import './Profile.style.css';
import { Link } from 'react-router-dom'; // Importa Link
// import { usersData } from '../../data/usersData';

// passing the value as props

const ProfileBar =({isVisibleP, User, SetUser})=>{
    // const {isVisible,ShowHideSideBar} = UseShowHideSideBar(false);
    
    // agregar el resto de componentes en el ul
    const LogOutUser = ()=>{
        SetUser({...User, ["role"]:""})
    }


    return (
        <div>
            <div className={`profileBar ${isVisibleP ? 'profileBar--visible': ''}`}>
                <ul className='profileBar__list'>               
                    <li className={`profileBar__item profileBar__item--dashboard ${User.role === 'Admin' || User.role === 'Student' ? 'profileBar__item--dashboard--Visible' : ''}`}>
                        <Link className='profileBar__link' to="/dashboard">Dashboard</Link>
                    </li>
                    <li className={`profileBar__item profileBar__item--profiles ${User.role === 'Admin' || User.role === 'Student' ? 'profileBar__item--profiles--Visible' : ''}`}>
                        <Link className='profileBar__link' to="/profiles">Profiles</Link>
                    </li>
                    <li className={`profileBar__item profileBar__item--profiles ${User.role === 'Student' ? 'profileBar__item--profiles--Visible' : ''}`}>
                        <Link className='profileBar__link' to="/addCourses">Add Courses</Link>
                    </li>
                    <li className={` profileBar__item profileBar__item--courses ${ User.role === 'Student' ? 'profileBar__item--courses--Visible' : ''}`}>
                        <Link className='profileBar__link' to="/mycourses">My Courses</Link>
                    </li>
                    <li className={`profileBar__item admin ${User.role === 'Admin' ? 'profileBar__item--visible': ''} `}>
                        <Link className='profileBar__link' to="/student-list">Student List</Link>
                    </li>
                    <li className={`profileBar__item admin ${User.role ==='Admin' ? 'profileBar__item--visible':''}`}>
                        <Link className='profileBar__link' to="/forms">Forms</Link>
                    </li>
                    <li className={`profileBar__item profileBar__item--login ${User.role === 'Admin'|| User.role==='Student' ? 'profileBar__item--login--noVisible' : ''}`}>
                        <Link className='profileBar__link' to="/login">Login</Link>
                    </li>
                    <li className={`profileBar__item profileBar__item--login ${User.role === 'Admin'|| User.role==='Student' ? 'profileBar__item--login--noVisible' : ''}`}>
                        <Link className='sideBar__link' to="/signUp">Sing Up</Link>
                    </li>
                    <li className={`profileBar__item profileBar__item--login ${User.role === 'Admin'|| User.role==='Student' ? 'profileBar__item--login--Visible' : 'profileBar__item--login--noVisible'}`}>
                        <Link className='sideBar__link' to="/login" onClick={LogOutUser}>Sing Out</Link>
                    </li>
                </ul>                
            </div>
        </div>
    );
    
}

export default ProfileBar;