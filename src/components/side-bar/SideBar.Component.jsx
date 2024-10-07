import React,{useState} from 'react';
import './Sidebar.style.css';
import UseShowHideSideBar from '../../hooks/UseShowHideSideBar';

// passing the value as props. isVisible is a boolean value 
const SideBar =({isVisible})=>{
    // const {isVisible,ShowHideSideBar} = UseShowHideSideBar(false);

    return (
        <div>
            {/* <nav>
                <button onClick={ShowHideSideBar}>show bar</button>
            </nav> */}
            {/* Here i have the boolean value so i can check if its true or false using the ternary operator */}
            <div className={`sideBar ${isVisible ? 'sideBar--visible': ''}`}>
                <ul className='sideBar__list'>
                    <li className='sideBar__item'>
                        <a className='sideBar__link' href='#home'>Home</a>
                    </li>
                    <li className='sideBar__item'>
                        <a className='sideBar__link' href='#programs'>Programs</a>
                    </li>
                    <li className='sideBar__item'>
                    <a className='sideBar__link' href='#courses'>Courses</a>
                    </li>
                    <li className='sideBar__item'>
                    <a className='sideBar__link' href='#about'>About</a>
                    </li>
                </ul>
                
            </div>
        </div>
    );
    
}

export default SideBar;