import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // To handle navigation

import { usersData } from '../../data/usersData';

const LoginForm = ({User,SetUser}) => {
    const [formData, setFormData] = useState({User});


    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // For navigation

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setLoading(true);
            try {
                const response = await mockApiCall(formData);

                //we get the role from the token
                //And add it to the formData
                
                SetUser(response.data)

                // Store token in local storage/session/cookies
                //localStorage.setItem('token', response.header.token);

                console.log('Login success:', response);
                setLoading(false);

                navigate('/Home')
            } catch (error) {
                console.error('Login error:', error);
                setLoading(false);
            }
        }
    };

    const mockApiCall = (data) => {

      return new Promise((resolve) => {

            setTimeout(() => {
              console.log(data)
              console.log(usersData[0])
              data = usersData.find(user=> user.username===data.username && user.password===data.password)
              if(!data) throw Error('Invalid username or password')
              resolve({ message: 'Login successful', data });
            }, 2000);
      });

    };

    const goToSignup = () => {
        navigate('/signup');  // Redirect to signup page
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Login</h2>
                    <div className="form-container">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? 'Logging In...' : 'Log In'}
                            </Button>
                        </Form>

                        <Button variant="secondary" className="mt-3" onClick={goToSignup}>
                            Sign Up
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};


export default LoginForm;

