
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {postData} from '../../utilities/fetchOps.js'
import {nullUser} from '../../utilities/nullObjs.js'

const SignupForm = ({SetUser}) => {

  const url = 'http://localhost:5000/api/v1/signin'
  //const nullUser = {firstName:'',lastName:'',email:'', countryCode:'', phone:'', birthday:'', department:'', program:'', username :'', password:'', role:''}
  const [formData, setFormData] = useState(nullUser);
  const [errors, setErrors] = useState({});
  const [registered, setRegistered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ifItIsDisabled, setDisabled] = useState(false)
  

  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {};
    if (!formData.role) {
      newErrors.role = 'role is required';
    }
    else{
      if (formData.role !== 'Admin') {

        if (!formData.department) {
          newErrors.department = 'Department is required';
        }
        if (!formData.program) {
          newErrors.program = 'Program is required';
        }
      }

  
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
  
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      }
  
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRadioChange = (e) => {
    setFormData({ ...formData, ["role"]: e.target.value })
  }

 
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    setLoading(true)
    const validationErrors = validate();
    if(Object.keys(validationErrors).length > 0){
      console.log(validationErrors)
      setErrors(validationErrors)  
      return
    } 

    const response = await postData(url, formData)
    console.log(response)

    if(response.submissionError){
      console.log(response)
      SetUser(nullUser)
      setErrors(response)
      setLoading(false)  
      return
    } 
    else if(response.data){
      console.log('User signed up:', response.data.newUserData)
      setErrors({})
      SetUser(response.data.newUserData)
      localStorage.setItem('user', JSON.stringify(response.data.newUserData))
      setRegistered(true) 
    }
  }

  useEffect(()=>{
    if(formData.role === 'Admin')
      setDisabled(true)
    else setDisabled(false)
  }, [formData] )

  useEffect(()=>{
   setTimeout(()=>{
    setErrors({})
   }, 5000)
  }, [errors]) 

  useEffect(()=>{
    if(registered){
      setTimeout(()=>{
        setRegistered(false)
        setLoading(false) 
        navigate('/Home')
      }, 3000)
    }
   }, [registered]) 
       
  
  return (
    <form onSubmit={handleSubmit} className="container" style={{ display: 'flex', flexDirection: 'column' }} >
      {errors.submissionError && (
      <div className="alert alert-danger" role="alert">
        That user already exists.
      </div>
    )}
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
          disabled = {ifItIsDisabled}
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
          disabled = {ifItIsDisabled}
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
      <div className={"mb-3"}>
        <label>
          <input
            value="Student"
            type="radio"
            name="role"
            className={`${errors.role ? 'is-invalid' : ''}`}
            onChange={handleRadioChange}
          />
          Student
        </label>
        <label className="ms-3">
          <input
            value="Admin"
            type="radio"
            name="role"
            className={errors.role ? 'is-invalid' : ''}
            onChange={handleRadioChange}
          />        
          Admin 
        </label>        
      </div>
   
      {errors.role && <div className="alert alert-danger" role="alert">{errors.role}</div>}

      <button type="submit" className="btn btn-primary" disabled={loading}>Sign Up</button>

      {registered && <div className="mt-3 alert alert-success" role="alert"> You were registered successfully </div>}

    </form>
  );


};

export default SignupForm;
