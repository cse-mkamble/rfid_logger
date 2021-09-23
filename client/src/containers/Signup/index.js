import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Input from "../../components/UI/Input";
import Password from "../../components/UI/Password";
import ErrorDialog from "../../components/ErrorModal";
import { signupSchoolAuth } from "../../redux/actions";
import './index.css';

const Signup = () => {

    AOS.init({})

    const [errors, setErrors] = useState('');

    const [showDialog, setShowDialog] = useState(false);
    const handleClickOpenShowDialog = () => setShowDialog(true);
    const handleCloseShowDialog = () => setShowDialog(false);


    const [schoolName, setSchoolName] = useState('');
    const [schoolEmail, setSchoolEmail] = useState('');
    const [schoolPhone, setSchoolPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const schoolUserSignup = (e) => {
        e.preventDefault();
        if (validate()) {
            const user = { schoolName, schoolEmail, schoolPhone, address, city, region, country, password, confirmPassword };
            dispatch(signupSchoolAuth(user));
        }
    }

    const validate = () => {
        let errors = {};
        let isValid = true;
        if (!schoolPhone) {
            errors["school_phone"] = "Plese fill in Telephone Number filed.";
            isValid = false;
        }
        if (password !== "undefined" && confirmPassword !== "undefined") {
            if (password != confirmPassword) {
                errors["confirm_password"] = "Confirm Password don't match.";
                isValid = false;
            }
        }
        setErrors(errors)
        if (Object.values(errors)[0]) handleClickOpenShowDialog()
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
                                                        <div className="text-danger">{errors.school_phone}</div>
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
                                                        required
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        errorMessage={""}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Password
                                                        label={"Confirm Password"}
                                                        placeholder={"Confirm Password"}
                                                        required
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        errorMessage={errors.confirm_password}
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

            <ErrorDialog
                show={showDialog}
                handleClose={handleCloseShowDialog}
                title={"Error"}
                text={Object.values(errors)[0]}
            />

        </div>
    );
};

export default Signup;