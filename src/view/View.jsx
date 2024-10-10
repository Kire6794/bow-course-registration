import React from "react"
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer.component";
import MenuBar from "../components/menu-bar/MenuBar.Component";
import SideBar from "../components/side-bar/SideBar.Component";
import ProfileBar from "../components/profile-bar/Profile.Component"


// Importamos los hooks personalizados
import UseShowHideSideBar from '../components/hooks/UseShowHideSideBar';
import UseShowHideProfileBar from '../components/hooks/UseShowHideProfileBar';

function View() {
  // Usamos los hooks personalizados para controlar la visibilidad de las barras laterales
  const { isVisible: isSideBarVisible, ShowHideSideBar } = UseShowHideSideBar(false);
  const { isVisibleP: isProfileBarVisible, ShowHideProfileBar } = UseShowHideProfileBar(false);

  return (
    <>
      <div className="view-container">
        {/* Pasamos las funciones de control a MenuBar */}
        <MenuBar
          ShowHideSideBar={ShowHideSideBar}
          ShowHideProfileBar={ShowHideProfileBar}
          titlePage="My App"
        />

        {/* Barra lateral izquierda (SideBar) */}
        <SideBar isVisible={isSideBarVisible} />

        {/* Barra lateral derecha (ProfileBar) */}
        <ProfileBar isVisibleP={isProfileBarVisible} />

        <div className="view-content">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default View;
