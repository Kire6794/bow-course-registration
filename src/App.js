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
import { usersData } from './data/usersData';



function App() {


  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    phone: "123-456-7890",
    birthday: "2000-05-15",
    department: "Software Development",
    program: "Software Development - Diploma (2 years)",
    username: "john.doe",
    password: "securePassword123",
    role: "Student",
    courses: [
      {
        courseName: "Programming Fundamentals",
        courseCode: "SD-201",
        typeTerm: "Spring",
        courseDay: "Wednesday",
        courseTime: "1:00 PM - 3:00 PM",
        deliveryMode: "Online",
      },
      {
        courseName: "Web Programming",
        courseCode: "SD-203",
        typeTerm: "Winter",
        courseDay: "Tuesday",
        courseTime: "10:00 AM - 12:00 PM",
        deliveryMode: "In-Person",
      },
    ],})
  const SetUser = (user)=>{
    setUser(user)
  } 



  return (
    <Router>
      <div className="App">
        
        {/* Definir las rutas que navegarán entre los componentes */}
        <Routes>
          <Route path="/" element={<View User={user}/>}> {/* paso el user para que modificar en el profileSideBar */}
            <Route index element={<Login />} />
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
