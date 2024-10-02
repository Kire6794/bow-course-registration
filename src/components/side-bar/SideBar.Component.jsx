import React from 'react';
import './Sidebar.style.css';


const SideBar =()=>{
    return (
        <div className='sideBar'>
            <ul className='sideBar__list'>
                <li className='sideBar__item'>
                    <a className='sideBar__link' href='#section1'>Hola</a>
                </li>
                <li className='sideBar__item'>
                    <a className='sideBar__link' href='#section2'>Zozorra</a>
                </li>
                <li className='sideBar__item'>
                <a className='sideBar__link' href='#section3'>Zozorrita</a>
                </li>
                <li className='sideBar__item'>
                <a className='sideBar__link' href='#section4'>Asquerosa</a>
                </li>
            </ul>
            
        </div>
    );
    
}

export default SideBar;