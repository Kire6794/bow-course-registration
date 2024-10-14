import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // To handle navigation

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '',
        phone: '',
        birthday: '',
        department: '',
        program: '',
        username: '',
        password: '',
        terms: false
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // For navigation

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            console.log('User is signed up with username:', storedUsername);
        }
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!/^\+\d+$/.test(formData.countryCode)) newErrors.countryCode = 'Invalid country code';
        if (!/^\d+$/.test(formData.phone)) newErrors.phone = 'Phone number must be digits';
        if (!formData.birthday) newErrors.birthday = 'Birthday is required';
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.program) newErrors.program = 'Program is required';
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!formData.terms) newErrors.terms = 'You must agree to the terms and conditions';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, terms: e.target.checked });
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

                // Store the username and other user details in local storage
                localStorage.setItem('username', formData.username);
                localStorage.setItem('firstName', formData.firstName);
                localStorage.setItem('lastName', formData.lastName);

                console.log('Signup success:', response);
                setLoading(false);

                navigate('/Login');
            } catch (error) {
                console.error('Signup error:', error);
                setLoading(false);
            }
        }
    };

    const mockApiCall = (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: 'Signup successful', data });
            }, 2000);
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        console.log('User logged out');
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={12}>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <div className="form-container">
                        <Form onSubmit={handleSubmit}>
                            {/* First Name */}
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    isInvalid={!!errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Last Name */}
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    isInvalid={!!errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Email */}
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address:</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Country Code and Phone */}
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formCountryCode">
                                        <Form.Label>Country Code:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="countryCode"
                                            placeholder="+1 (United States)"
                                            onChange={handleChange}
                                            isInvalid={!!errors.countryCode}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.countryCode}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formPhone">
                                        <Form.Label>Phone:</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            placeholder="10 digits phone"
                                            onChange={handleChange}
                                            isInvalid={!!errors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Birthday */}
                            <Form.Group controlId="formBirthday">
                                <Form.Label>Date of Birthday:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="birthday"
                                    onChange={handleChange}
                                    isInvalid={!!errors.birthday}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.birthday}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Department */}
                            <Form.Group controlId="formDepartment">
                                <Form.Label>Department:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="department"
                                    onChange={handleChange}
                                    isInvalid={!!errors.department}
                                >
                                    <option value="">Select Department</option>
                                    <option value="Software Development">Software Development</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.department}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Program */}
                            <Form.Group controlId="formProgram">
                                <Form.Label>Program:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="program"
                                    onChange={handleChange}
                                    isInvalid={!!errors.program}
                                >
                                    <option value="">Select Program</option>
                                    <option value="Diploma">Diploma (2 years)</option>
                                    <option value="Post-Diploma">Post-Diploma (1 year)</option>
                                    <option value="Certificate">Certificate (6 months)</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.program}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Username */}
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

                            {/* Password */}
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

                            {/* Terms and Conditions */}
                            <div className="terms-container">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    onChange={handleCheckboxChange}
                                />
                                <label>
                                    I agree to the <a href="#terms">terms and conditions</a>
                                </label>
                                {errors.terms && <div className="text-danger">{errors.terms}</div>}
                            </div>

                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? 'Signing Up...' : 'Sign up'}
                            </Button>
                        </Form>

                        {/* Logout button for testing purposes */}
                        <Button variant="secondary" className="mt-3" onClick={handleLogout}>
                            Log Out
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignupForm;
