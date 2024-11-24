
import React, { useState } from 'react';
//import { Form, Button, Container, Row, Col } from 'react-bootstrap';
//import './SignupForm.style.css'; // Puedes agregar estilos personalizados aquí
//import '../App.css';
import { Navigate, useNavigate } from 'react-router-dom';

const SignupForm = ({User,SetUser}) => {
  const [formData, setFormData] = useState(User);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.countryCode.trim()) {
      newErrors.countryCode = 'Country code is required';
    } else if (!/^\+\d+$/.test(formData.countryCode)) {
      newErrors.countryCode = 'Country code is invalid (must start with + and digits)';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number should contain only digits';
    }

    if (!formData.birthday) {
      newErrors.birthday = 'Birthday is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.program) {
      newErrors.program = 'Program is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRadioChange = (e) => {
    setFormData({ ...formData, ["role"]: e.target.value })
  }
    ;
  

  const handleSubmit = (e) => {
    //SetUser(null)
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      SetUser(formData)
    } else {
      setErrors({});
      console.log('User signed up:', formData);
      SetUser(formData)
      
      // Aquí agregarías la lógica para enviar los datos al backend

      //Por aqui de el setter del user para pasar la informacion del user recien registrado a los demas componentes
      //En caso de que despues de registrar se quiera loggear automaticamente al user.
      // El Login tiene su propio fetch con GET
      // El SignUp tiene su propio fetch con POST y esperaria los datos del usuario
      // El usuario enviaria la contrasena pero recibiria su informacion nuevamente sin la contrasena

      //If the login is ok go to the dashboard
      navigate('/dashboard')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container" style={{ display: 'flex', flexDirection: 'column' }} >
      <div className="row mb-3" >
        <div className="col">
          <input
            type="text"
            name="firstName"
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            placeholder="First Name"
            onChange={handleChange}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>
        <div className="col">
          <input
            type="text"
            name="lastName"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            placeholder="Last Name"
            onChange={handleChange}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>
      </div>

      <div className="mb-3">
        <input
          type="email"
          name="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="row mb-3">
        <div className="col-3">
          <input
            type="text"
            name="countryCode"
            className={`form-control ${errors.countryCode ? 'is-invalid' : ''}`}
            placeholder="Country Code (e.g., +1)"
            onChange={handleChange}
          />
          {errors.countryCode && <div className="invalid-feedback">{errors.countryCode}</div>}
        </div>
        <div className="col">
          <input
            type="tel"
            name="phone"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="Phone"
            onChange={handleChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
      </div>

      <div className="mb-3">
        <input
          type="date"
          name="birthday"
          className={`form-control ${errors.birthday ? 'is-invalid' : ''}`}
          onChange={handleChange}
        />
        {errors.birthday && <div className="invalid-feedback">{errors.birthday}</div>}
      </div>

      <div className="mb-3">
        <select
          name="department"
          className={`form-select ${errors.department ? 'is-invalid' : ''}`}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="Software Development">Software Development</option>
        </select>
        {errors.department && <div className="invalid-feedback">{errors.department}</div>}
      </div>

      <div className="mb-3">
        <select
          name="program"
          className={`form-select ${errors.program ? 'is-invalid' : ''}`}
          onChange={handleChange}
        >
          <option value="">Select Program</option>
          <option value="Diploma (2 years)">Diploma (2 years)</option>
          <option value="Post-Diploma (1 year)">Post-Diploma (1 year)</option>
          <option value="Certificate (6 months)">Certificate (6 months)</option>
        </select>
        {errors.program && <div className="invalid-feedback">{errors.program}</div>}
      </div>

      <div className="mb-3">
        <input
          type="text"
          name="username"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          placeholder="Username"
          onChange={handleChange}
        />
        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <div className="mb-3">
        <label>
          <input
            value="Student"
            type="radio"
            name="role"
            onChange={handleRadioChange}
          />
          Student
        </label>
        <label className="ms-3">
          <input
            value="Admin"
            type="radio"
            name="role"
            onChange={handleRadioChange}
          />
          Admin
        </label>
        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
      </div>

      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  );


};

export default SignupForm;
