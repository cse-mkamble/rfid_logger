import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Input from "../../components/UI/Input";
import './index.css';

const Signin = () => {

    AOS.init({})

    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [ownerPhone, setOwnerPhone] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [schoolPhone, setSchoolPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const schoolUserSignup = (e) => {
        e.preventDefault()
        // const user = { loginId, password }
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
                            width: '700px',
                            padding: '20px 0'
                        }}>
                        <div>
                            <Container>
                                <Row>
                                    <Col>

                                        <div style={{
                                            textAlign: 'center',
                                            marginBottom: '20px'
                                        }}>
                                            <h3>Create Account</h3>
                                        </div>

                                        <Form onSubmit={schoolUserSignup}>

                                            <Row>
                                                <Col>
                                                    <Input
                                                        label="Owner Name"
                                                        placeholder="Owner Name"
                                                        value={ownerName}
                                                        type="text"
                                                        onChange={(e) => setOwnerName(e.target.value)}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Input
                                                        label="Owner Email"
                                                        placeholder="Owner Email"
                                                        value={ownerEmail}
                                                        type="email"
                                                        onChange={(e) => setOwnerEmail(e.target.value)}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Input
                                                        label="School Name"
                                                        placeholder="School Name"
                                                        value={schoolName}
                                                        type="text"
                                                        onChange={(e) => setSchoolName(e.target.value)}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <div style={{ marginBottom: '10px' }}>
                                                        <label>Owner Phone Number</label>
                                                        <PhoneInput
                                                            country={'in'}
                                                            className='form-control'
                                                            value={ownerPhone}
                                                            onChange={setOwnerPhone}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div style={{ marginBottom: '10px' }}>
                                                        <label>School Phone Number</label>
                                                        <PhoneInput
                                                            country={'in'}
                                                            className='form-control'
                                                            value={schoolPhone}
                                                            onChange={setSchoolPhone}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <div style={{ marginBottom: '10px' }}>
                                                        <label>Country</label>
                                                        <CountryDropdown
                                                            className='form-control'
                                                            value={country}
                                                            onChange={(val) => setCountry(val)} />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div style={{ marginBottom: '10px' }}>
                                                        <label>State</label>
                                                        <RegionDropdown
                                                            className='form-control'
                                                            country={country}
                                                            value={region}
                                                            onChange={(val) => setRegion(val)} />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Input
                                                        label="City"
                                                        placeholder="City"
                                                        value={city}
                                                        type="text"
                                                        onChange={(e) => setCity(e.target.value)}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <div style={{ marginBottom: '10px' }} >
                                                        <label>Address</label>
                                                        <textarea
                                                            className='form-control'
                                                            style={{ resize: 'none' }}
                                                            rows="3"
                                                            placeholder="Address"
                                                            value={address}
                                                            type="text"
                                                            onChange={(e) => setAddress(e.target.value)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Input
                                                        label="Password"
                                                        placeholder="Password"
                                                        value={password}
                                                        type="password"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Input
                                                        label="Confirm Password"
                                                        placeholder="Confirm Password"
                                                        value={confirmPassword}
                                                        type="password"
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                </Col>
                                            </Row>

                                            <Button variant="primary" type="submit" style={{ width: '100%' }}>
                                                Submit
                                            </Button>

                                            <div style={{
                                                marginTop: '40px',
                                                textAlign: 'center'
                                            }}>
                                                Already have an account? <Link to='/signin'>Signin here</Link>
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