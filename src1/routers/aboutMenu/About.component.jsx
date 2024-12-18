// src/components/About.component.jsx
import React, { useState } from 'react';
import { aboutFormData } from '../../data/aboutForm'; // Importa el array para almacenar los datos
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap
//import './About.style.css'; // Puedes agregar estilos personalizados aquí

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    about: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    aboutFormData.push(formData); // Guarda los datos en el array
    console.log('Datos enviados:', formData); // Puedes eliminar esto más tarde
    // Reinicia el formulario después de enviar
    setFormData({
      name: '',
      email: '',
      date: '',
      about: '',
      message: '',
    });
    };

  return (
    <div className="container my-4">
      <h1 className="text-center">About Us</h1>
      <p className="text-center">We provide high-quality education programs for students around the world.</p>

      <h2 className="mt-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">
            Name:
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Email:
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Date:
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">     About:     </label>
            
            <textarea
              name="about"
              className="form-control"
              rows="1"
              value={formData.about}
              onChange={handleChange}
              required
            />

        </div>
        <div className="mb-3">
          <label className="form-label">    Message:      </label>
            
            <textarea
              name="message"
              className="form-control"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              required
            />

        </div>
        <button type="submit" className="btn btn-primary mb-3">Enviar</button>
      </form>
    </div>
    
  );
};

export default About;
