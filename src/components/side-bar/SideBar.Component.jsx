import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import './Sidebar.style.css';


// passing the value as props. isVisible is a boolean value 
const SideBar =({isVisible})=>{
    

    return (
        <div
       
        >
        
            {/* Here i have the boolean value so i can check if its true or false using the ternary operator */}
            <div className={`sideBar ${isVisible ? 'sideBar--visible': ''}`}>
                <ul className='sideBar__list'>
                    <li className='sideBar__item'>
                        <Link className='sideBar__link' to="/Home">Home</Link> {/* Cambiado a Link */}
                    </li>
                    <li className='sideBar__item'>
                        <Link className='sideBar__link' to="/programs">Programs</Link>
                    </li>
                    <li className='sideBar__item'>
                        <Link className='sideBar__link' to="/about">About</Link>
                    </li>
                </ul>
                
            </div>
        </div>
    );
    
}

export default SideBar;