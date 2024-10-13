import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


// Importaciones de componentes
import View from './view/View'; // Importa el componente View
import Home from './routers/homeMenu/Home.component';
import Programs from './routers/programsMenu/Programs.component';
import About from './routers/aboutMenu/About.component';
import SignUp from './routers/Singupform/SignupForm.component';
import Dashboard from './routers/dashboard/Dashboard.components';
import Profiles from './routers/profile/Profile.component';
import StudentList from './routers/studentLis/StudentLis.components';
import Forms from './routers/forms/Forms.component';
import Login from './routers/login/Login.componen';




function App() {

  const [user, setUser] = useState({})
  const SetUser = (user)=>{
    setUser(user)
  } 


  return (
    <Router>
      <div className="App">
        {/* Definir las rutas que navegarán entre los componentes */}
        <Routes>
          <Route path="/" element={<View />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp SetUser = {SetUser} />} /> {/* I pass a method to get the user info fetched from the server inside this component */}
            <Route path="login" element={<Login SetUser = {SetUser} />} />
            <Route path="dashboard" element={<Dashboard User = {user}/>} />
            <Route path="profiles" element={<Profiles User = {user}/>} /> {/* I get the profile updated with user data that comes from sign up or login*/}
            <Route path="programs" element={<Programs />} />
            <Route path="about" element={<About />} />
            <Route path="student-list" element={<StudentList />} />
            <Route path="forms" element={<Forms />} />           
          </Route>          
        </Routes>
      </div>
    </Router>
  );
};
 


export default App;
