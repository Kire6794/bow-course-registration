import React,{useState} from 'react';
import './Profile.style.css';
import UseShowHideProfileBar from '../../hooks/UseShowHideProfileBar';

// passing the value as props
const ProfileBar =({isVisibleP})=>{
    // const {isVisible,ShowHideSideBar} = UseShowHideSideBar(false);

    return (
        <div>
            {/* <nav>
                <button onClick={ShowHideSideBar}>show bar</button>
            </nav> */}

            <div className={`profileBar ${isVisibleP ? 'profileBar--visible': ''}`}>
                <ul className='profileBar__list'>
                    <li className='profileBar__item'>
                        <a className='profileBar__link' href='#Dasboard'>Dasboard</a>
                    </li>
                    <li className='profileBar__item'>
                        <a className='profileBar__link' href='#Profile'>Profile</a>
                    </li>
                    <li className='profileBar__item'>
                    <a className='profileBar__link' href='#My Courses'>My Courses</a>
                    </li>
                    <li className='profileBar__item'>
                    <a className='profileBar__link' href='#Contact'>Contact</a>
                    </li>
                    <li className='profileBar__item'>
                    <a className='profileBar__link' href='#Logout'>Logout</a>
                    </li>
                </ul>
                
            </div>
        </div>
    );
    
}

export default ProfileBar;