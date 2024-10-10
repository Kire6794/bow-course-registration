import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


// Importaciones de componentes
import View from './view/View'; // Importa el componente View
import Home from './routers/homeMenu/Home.component';
import Courses from './routers/coursesMenu/Courses.component';
import Programs from './routers/programsMenu/Programs.component';
import About from './routers/aboutMenu/About.component';
import SignUp from './routers/Singupform/SignupForm.component';
import Dashboard from './routers/dashboard/Dashboard.components';
import Profiles from './routers/profile/Profile.component';
import StudentList from './routers/studentLis/StudentLis.components';
import Forms from './routers/forms/Forms.component';
import Login from './routers/login/Login.componen';




function App() {
  return (
    <Router>
      <div className="App">
        {/* Definir las rutas que navegarán entre los componentes */}
        <Routes>
          <Route path="/" element={<View />}>
            <Route index element={<Home />} />
            <Route path="programs" element={<Programs />} />
            <Route path="courses" element={<Courses />} />
            <Route path="about" element={<About />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profiles" element={<Profiles/>} />
            <Route path="student-list" element={<StudentList />} />
            <Route path="forms" element={<Forms />} />
            <Route path="login" element={<Login />} />
          </Route>          
        </Routes>
      </div>
    </Router>
  );
};
 


export default App;
