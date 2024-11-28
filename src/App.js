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

/*
    firstName: "Michael",
    lastName: "Johnson",
    email: "michaeljohnson@email.com",
    phone: "555-123-4567",
    birthday: "2001-03-10",
    department: "Software Development",
    program: "Certificate (6 months)",
    username: "michael.johnson",
    password: "mjPass789",
    role: "Student",
    courses: [
      {
        courseName: "HTML & CSS Basics",
        courseCode: "SD-402",
        typeTerm: "Spring",
        courseDay: "Wednesday",
        courseTime: "1:00 PM - 3:00 PM",
        deliveryMode: "Online",
      },
      {
        courseName: "JavaScript Essentials",
        courseCode: "SD-403",
        typeTerm: "Summer",
        courseDay: "Thursday",
        courseTime: "2:00 PM - 4:00 PM",
        deliveryMode: "In-Person",
      },

    ],

*/

function App() {

  const [user, setUser] = useState({
    firstName: "Robert",
    lastName: "Miller",
    email: "robertmiller@email.com",
    countryCode: "+1",
    phone: "654-987-3210",
    birthday: "1975-06-10",
    department: "Software Development",
    program: null,
    username: "robert.miller",
    password: "adminRobert123",
    role: "Admin",
})

  const SetUser = (user)=>{
    setUser(user)
  } 

  useEffect(()=>{
    console.log(user)
  },[user])

  return (
    <Router>
      <div className="App">
        
        {/* Definir las rutas que navegarán entre los componentes */}
        <Routes>
          <Route path="/" element={<View User={user} SetUser={SetUser}/>}> {/* paso el user para que modificar en el profileSideBar */}
            <Route index path="Home" element={<Home />} />
            <Route path="signup" element={<SignUp User={user} SetUser = {SetUser} />} /> {/* I pass a method to get the user info fetched from the server inside this component */}
            <Route path="login" element={<Login  User={user} SetUser = {SetUser} />} />
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
