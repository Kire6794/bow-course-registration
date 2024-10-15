import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

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
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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
            setLoading(true);  // Show loading
            try {
                const response = await mockApiCall(formData);
                console.log('Success:', response);
                setLoading(false);  // Hide loading
                
            } catch (error) {
                console.error('Error during sign up:', error);
                setLoading(false);  // Hide loading
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

    return (
        <Container className="form-container">
            <Row className="justify-content-center">
                <Col md={12}>
                    <h2 className="text-center mb-4">Registration Form</h2>
                    <div>
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
                                <Col md={4}>
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
                                <Col md={8}>
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

                            {/* Submit Button */}
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? 'Signing Up...' : 'Sign up'}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignupForm;
