import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Input from "../../components/UI/Input";
import Password from "../../components/UI/Password";
import './index.css';

const Signin = () => {

    AOS.init({})

    const [schoolEmail, setSchoolEmail] = useState('');
    const [password, setPassword] = useState('');

    const schoolUserSignin = (e) => {
        e.preventDefault()
        const user = { schoolEmail, password }
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

                                            <Row>
                                                <Col>
                                                    <Input
                                                        label="Email"
                                                        placeholder="Email"
                                                        required
                                                        value={schoolEmail}
                                                        type="email"
                                                        onChange={(e) => setSchoolEmail(e.target.value)}
                                                    />
                                                </Col>
                                            </Row>


                                            <Row>
                                                <Col>
                                                    <Password
                                                        label={"Password"}
                                                        placeholder={"Password"}
                                                        required
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        errorMessage={""}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <div style={{ textAlign: 'end', marginBottom: '20px' }}><Link>Forgot Password</Link></div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Button variant="primary" type="submit" style={{ width: '100%' }}> Login </Button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div style={{ marginTop: '40px', textAlign: 'center' }}>
                                                        Not a member? <Link to='/signup'>Signup now</Link>
                                                    </div>
                                                </Col>
                                            </Row>

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