import React from 'react';
import MenuIcon from '../../iconos/svg/list.svg';
import ProfileIcon from '../../iconos/svg/person-lines-fill.svg';

const MenuBar = ({ShowHideSideBar,ShowHideProfileBar,titlePage})=>{

    return(
      <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button className="button" onClick={ShowHideSideBar}  class="btn btn-outline-success" type="submit">
            <img src={MenuIcon} alt="Menu Icon" width="16" height="16" />
          </button>
          <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
              <span class="navbar-text">
                {titlePage}
              </span>
            </div>
          </nav>
          {/* <button className='button' onClick={ShowHideProfileBar}>SideBarRigth</button> */}
          <button className="button" onClick={ShowHideProfileBar} class="btn btn-outline-success" type="submit">
            <img src={ProfileIcon} alt="Menu Icon" width="16" height="16" />
          </button>
          
        </div>
      </nav>
    </div>
    )
}
export default MenuBar