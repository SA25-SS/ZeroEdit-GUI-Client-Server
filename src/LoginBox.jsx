// LoginBox.js
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { login, logout } from './utils/auth';
import { saveUsername } from './utils/storage';

const LoginBox = () => {
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const username = event.target.formUsername.value;
        const password = event.target.formPassword.value;
        
        try {
            await login({username, password})
            .then(() => saveUsername(username))
            .then(() => navigate('/'));
            // .catch(error => alert(error))
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div style={{ backgroundColor: '#eef4fa', minHeight: '100vh' }}>
            {logout()}
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <Row>
                    <Col>
                        <div
                            className="p-4 shadow d-flex flex-column justify-content-center"
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: '6px',
                                width: '380px',
                                height: '450px'
                            }}
                        >
                            <h2
                                className="text-center mb-4"
                                style={{ color: '#2e86de', fontSize: '3rem', fontWeight: 'bold' }}
                            >
                                ZeroEdit
                            </h2>
                            <Form className="flex-grow-1 d-flex flex-column justify-content-center" onSubmit={handleLogin}>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                        Username:
                                    </Form.Label>
                                    <Form.Control type="text" placeholder="Username" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                        Password:
                                    </Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mb-3">
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Login
                                </Button>
                            </Form>
                            <div className="text-center">
                                {/* Link to the Register page */}
                                <Link to="/register">New user? Register here</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LoginBox;
