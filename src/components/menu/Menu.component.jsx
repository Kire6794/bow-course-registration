import react from 'react';
import './Menu.style.css';

//passing the functions as props to change the values on the event on click
const NavBar=({ShowHideSideBar,ShowHideProfileBar})=>{

    return(
        <div className='container'>
            <nav>
                <button className='button' onClick={ShowHideSideBar}>SideBarLeft</button>
            </nav>
            <nav> 
                <button className='button' onClick={ShowHideProfileBar}>SideBarRigth</button>
            </nav>

        </div>
    
    )
}

export default NavBar;