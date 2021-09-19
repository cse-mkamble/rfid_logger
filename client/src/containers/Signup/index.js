import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Input from "../../components/UI/Input";
import './index.css';

const Signin = () => {

    AOS.init({})

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const schoolUserSignin = (e) => {
        e.preventDefault()
        const user = { loginId, password }
        // dispatch(login(user))
    }

    return (
        <div>
            <div>
                <div style={{
                    width: '100%',
                    marginTop: '50px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div
                        data-aos='fade-down'
                        className='shadow-lg bg-white'
                        style={{
                            width: '500px',
                            padding: '40px'
                        }}>
                        <div>
                            <Container>
                                <Row>
                                    <Col>
                                        <div style={{
                                            textAlign: 'center',
                                            marginBottom: '20px'
                                        }}>
                                            <h3>Signin</h3>
                                        </div>
                                        <Form onSubmit={schoolUserSignin}>
                                            <Input
                                                label="Login ID"
                                                placeholder="Login ID"
                                                value={loginId}
                                                type="text"
                                                onChange={(e) => setLoginId(e.target.value)}
                                            />
                                            <Input
                                                label="Password"
                                                placeholder="Password"
                                                value={password}
                                                type="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div style={{
                                                textAlign: 'end',
                                                marginBottom: '20px'
                                            }}><Link>Forgot Password</Link></div>
                                            <Button variant="primary" type="submit" style={{ width: '100%' }}>
                                                Login
                                            </Button>
                                            <div style={{
                                                marginTop: '40px',
                                                textAlign: 'center'
                                            }}>
                                                Not a member? <Link>Signup now</Link>
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;