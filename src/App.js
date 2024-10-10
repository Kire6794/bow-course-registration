import React, { useState } from 'react';
import './App.css';
import MenuBar from './components/menu-bar/MenuBar.Component';
import SideBar from './components/side-bar/SideBar.Component';
import NavBar from './components/menu/Menu.component';
import ProfileBar from './components/profile-bar/Profile.Component';
import UseShowHideSideBar from './hooks/UseShowHideSideBar';
import UseShowHideProfileBar from './hooks/UseShowHideProfileBar';
import Courses from './components/coursesMenu/Courses.component';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const App =()=>{
  // Call the personalized hooks
  const {isVisible,ShowHideSideBar} = UseShowHideSideBar(false);
  const {isVisibleP,ShowHideProfileBar} = UseShowHideProfileBar(false);

  const [selectedProgram, setSelectedProgram] = useState('');

  return (
    <div className="App">
      <div>
        <MenuBar ShowHideSideBar={ShowHideSideBar} ShowHideProfileBar={ShowHideProfileBar}></MenuBar>

        {/* passing the function as props to change the state of the bar */}
       
        {/* passing the value to the bars to set the state */}
        <SideBar isVisible = {isVisible}></SideBar>
        <ProfileBar isVisibleP={isVisibleP}></ProfileBar>
      </div>
      
      
      <Courses selectedProgram={selectedProgram}></Courses>
      
    </div>
  );
}

export default App;
