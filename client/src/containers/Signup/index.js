import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Input from "../../components/UI/Input";
import Password from "../../components/UI/Password";
import ErrorModal from "../../components/ErrorModal";
import './index.css';

const Signup = () => {

    AOS.init({})

    const [error, setError] = useState('');

    const [schoolName, setSchoolName] = useState('');
    const [schoolEmail, setSchoolEmail] = useState('');
    const [schoolPhone, setSchoolPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const schoolUserSignup = (e) => {
        e.preventDefault()
        if (validate()) {
            console.log('yes')
        }
    }

    const validate = () => {
        let errors = {};
        let isValid = true;
        if (!schoolPhone) {
            isValid = false;
            errors["school_phone"] = "Plese fill in Telephone Number filed.";
            // alert("Plese fill in Telephone Number filed.")
        }
        if (password !== "undefined" && confirmPassword !== "undefined") {
            if (password != confirmPassword) {
                isValid = false;
                errors["confirm_password"] = "Confirm Password don't match.";
                // alert("Confirm Password don't match.")
            }
        }
        setError(errors);
        return isValid;
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
                                                        label="School Name"
                                                        placeholder="School Name"
                                                        required
                                                        value={schoolName}
                                                        type="text"
                                                        onChange={(e) => setSchoolName(e.target.value)}
                                                    />
                                                </Col>
                                            </Row>

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
                                                <Col>
                                                    <div style={{ marginBottom: '10px' }}>
                                                        <label>Telephone Number</label>
                                                        <PhoneInput
                                                            country={'in'}
                                                            className='form-control'
                                                            value={schoolPhone}
                                                            onChange={setSchoolPhone}
                                                        />
                                                        <div className="text-danger">{error.schoolPhone}</div>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <div style={{ marginBottom: '10px' }}>
                                                        <label>Country</label>
                                                        <CountryDropdown
                                                            className='form-control'
                                                            required
                                                            value={country}
                                                            onChange={(val) => setCountry(val)} />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div style={{ marginBottom: '10px' }}>
                                                        <label>Region (State)</label>
                                                        <RegionDropdown
                                                            className='form-control'
                                                            country={country}
                                                            required
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
                                                        required
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
                                                            required
                                                            value={address}
                                                            type="text"
                                                            onChange={(e) => setAddress(e.target.value)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Password
                                                        label={"Password"}
                                                        placeholder={"Password"}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        errorMessage={""}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Password
                                                        label={"Confirm Password"}
                                                        placeholder={"Confirm Password"}
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        errorMessage={error.confirm_password}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Button variant="primary" type="submit" style={{ width: '100%' }}>Submit</Button>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <div style={{ marginTop: '40px', textAlign: 'center' }}>
                                                        Already have an account? <Link to='/signin'>Login here</Link>
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

export default Signup;