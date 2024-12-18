import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // To handle navigation
import { postData } from '../../utilities/fetchOps';

const LoginForm = ({SetUser}) => {

    const url = 'http://localhost:5000/api/v1/login'
    const nullUser = {username :'', password:''}
    const [formData, setFormData] = useState(nullUser);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)

    const navigate = useNavigate();  // For navigation

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setLoading(false)
            return
        } 
                   
        const response = await postData(url, formData);
        if(response.submissionError){
            console.log(response)
            //setFormData(nullUser)
            setErrors(response)
            setLoading(false) 
            return
        }
        else if(response.data){
            SetUser(response.data.userData)
            const stringified = JSON.stringify(response.data.userData)
            localStorage.setItem('user', stringified)
            setErrors({})
            setLoggedIn(true)
            console.log('Login success:', response.data.userData);
        }
    }

    const goToSignup = () => {
        navigate('/signup');  // Redirect to signup page
    }

    useEffect(()=>{
        setTimeout(()=>{
            setErrors({})
        },5000)
    },[errors])

    useEffect(()=>{
        if(loggedIn){
            setTimeout(() => {
                setLoggedIn(false)
                setLoading(false)
                navigate('/home')
            }, 1500)
        }
    }, [loggedIn])

    useEffect(()=>{
        setTimeout(()=>{
         setErrors({})
        }, 5000)
       }, [errors]) 

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

                            <Button className='mt-3' type="submit" variant="primary" disabled={loading}>
                                {loading ? 'Logging In...' : 'Log In'}
                            </Button>
                        </Form>

                        <Button className='mt-3 mb-3' variant="secondary" onClick={goToSignup} disabled={loading}>
                            Sign Up
                        </Button>   
                       
                        {errors.submissionError? (<div className="alert alert-danger" role="alert">{errors.submissionError}</div>) : loggedIn? (<div className="alert alert-success" role="alert">Logged In Successfully</div>) : <></>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};


export default LoginForm;

