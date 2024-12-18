import React, { useState, useEffect } from 'react';
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
import AddCourses from './routers/addCourses/AddCourses.Component'
import StudentList from './routers/studentLis/StudentLis.components';
import Forms from './routers/forms/AdminForms.Component';
import Login from './routers/login/Login.componen';
import StudentCourses from './routers/courses/CoursesStudent.components';
import {nullUser} from './utilities/nullObjs.js'
function App() {
  //const nullUser = {firstName:'',lastName:'',email:'', countryCode:'', phone:'', birthday:'', department:'', program:'', username :'', password:'', role:''}
  const [user, setUser] = useState(nullUser);


  const SetUser = (user)=>{
    setUser(user)
  }
  // If the state is lost due to browser refresh this wil recover the user State.
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    user? SetUser(user) : SetUser(nullUser)
    console.log(user)
  }, [])


  //useEffect(()=>console.log(user), [user])
  return (
    <Router>
      <div className="App">
        
        {/* Definir las rutas que navegarán entre los componentes */}
        <Routes>
          <Route path="/" element={<View User={user} SetUser={SetUser}/>}> {/* paso el user para que modificar en el profileSideBar */}
            <Route index element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="signup" element={<SignUp SetUser={SetUser}/>} /> {/* I pass a method to get the user info fetched from the server inside this component */}
            <Route path="login" element={<Login SetUser={SetUser}/>} />
            <Route path="dashboard" element={<Dashboard User = {user}/>} />
            <Route path="profiles" element={<Profiles User = {user}/>} /> {/* I get the profile updated with user data that comes from sign up or login*/}
            <Route path="addCourses" element={<AddCourses User = {user} SetUser = {SetUser}/>} />
            <Route path="programs" element={<Programs User = {user}/>} />
            <Route path="mycourses" element={<StudentCourses User={user} SetUser={SetUser} />} />
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
