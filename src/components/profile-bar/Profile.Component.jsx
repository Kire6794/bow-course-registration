import React from 'react';
import './Profile.style.css';
import { Link } from 'react-router-dom'; // Importa Link


// passing the value as props
const ProfileBar =({isVisibleP})=>{
    // const {isVisible,ShowHideSideBar} = UseShowHideSideBar(false);
 
    // agregar el resto de componentes en el ul

    return (
        <div>
            {/* <nav>
                <button onClick={ShowHideSideBar}>show bar</button>
            </nav> */}

            <div className={`profileBar ${isVisibleP ? 'profileBar--visible': ''}`}>
                <ul className='profileBar__list'>
                    <li className='sideBar__item'>
                        <Link className='sideBar__link' to="/dashboard">Dashboard</Link>
                    </li>
                    <li className='sideBar__item'>
                        <Link className='sideBar__link' to="/profiles">Profiles</Link>
                    </li>
                    <li className='sideBar__item'>
                        <Link className='sideBar__link' to="/student-list">Student List AdminView</Link>
                    </li>
                    <li className='sideBar__item'>
                        <Link className='sideBar__link' to="/forms">Forms AdminView</Link>
                    </li>
                    <li className='sideBar__item'>
                        <Link className='sideBar__link' to="/login">Login</Link>
                    </li>
                    <li className='sideBar__item'>
                        <Link className='sideBar__link' to="/signUp">Sing Up</Link>
                    </li>
                </ul>
                
            </div>
        </div>
    );
    
}

export default ProfileBar;