import React from "react"
import './view.style.css'
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer.component";
import MenuBar from "../components/menu-bar/MenuBar.Component";
import SideBar from "../components/side-bar/SideBar.Component";
import ProfileBar from "../components/profile-bar/Profile.Component"


// Importamos los hooks personalizados
import UseShowHideSideBar from './hooks/UseShowHideSideBar';
import UseShowHideProfileBar from './hooks/UseShowHideProfileBar';


//pase user como prop que viene de app.js
function View({User,SetUser}) {
  

  // Usamos los hooks personalizados para controlar la visibilidad de las barras laterales
  const { isVisible: isSideBarVisible, ShowHideSideBar, setIsVisible: setIsSideBarVisible } = UseShowHideSideBar(false); //Modifique un toque los hooks porque necesitaba la setter standard
  const { isVisibleP: isProfileBarVisible, ShowHideProfileBar, setIsVisibleP: setIsProfileBarVisible } = UseShowHideProfileBar(false); // Ahora devuelve, estado, setter-toggler y setter-std.
  
  const HandleOnClick = ()=>{
    setIsSideBarVisible(false)
    setIsProfileBarVisible(false)
  }
  const user = User

  return (
    <>
      <div  className="view-container">
        {/* Pasamos las funciones de control a MenuBar */}
        <MenuBar
          ShowHideSideBar={ShowHideSideBar}
          ShowHideProfileBar={ShowHideProfileBar}
          titlePage="My App"
        />

        {/* Barra lateral izquierda (SideBar) */}
        <SideBar isVisible={isSideBarVisible} />

        {/* Barra lateral derecha (ProfileBar) */}

        <ProfileBar isVisibleP={isProfileBarVisible} User = {user} SetUser={SetUser}/>


        <div 
        onClick = {HandleOnClick} //Esconde las sidebar sin ir al boton nuevamente. 
        className="view-content">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default View;
