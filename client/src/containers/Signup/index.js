import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Input from "../../components/UI/Input";
import Password from "../../components/UI/Password";


class Signup extends Component {
    state = {
        schoolName: "",
        schoolEmail: "",
        schoolPhone: "",
        address: "",
        city: "",
        region: "",
        country: "",
        password: "",
        confirmPassword: "",
        otp: "",
        stage: "signup",
        waiting: false
    };

    componentDidMount() {
        console.log(this.props)
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSignupSubmit = async event => {
        event.preventDefault();
        this.setState({ waiting: true });
        const { schoolName, schoolEmail, schoolPhone, address, city, region, country, password, confirmPassword } = this.state;
        const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
        if (!schoolName || !schoolEmail || !schoolPhone || !address || !city || !region || !country || !password || !confirmPassword) {
            handleAddErrorMessages([
                { msg: "Required fields." }
            ]);
            this.setState({ waiting: false });
            return;
        }
        try {
            // const response = await axios.post(
            //     `${process.env.REACT_APP_SERVER_URL}/user/signup`,
            //     {
            //         email,
            //         password
            //     }
            // );
            // this.setState({ waiting: false });
            // handleAddSuccessMessage(response.data.msg);
            handleAddSuccessMessage("send email.");
            this.setState({ stage: "verifyotp" });
            this.setState({ waiting: false });
        } catch (err) {
            this.setState({ waiting: false });
            handleAddErrorMessages([
                { msg: "Something went wrong. Please try again." }
            ]);
            // if (err.response) {
            //     handleAddErrorMessages(err.response.data.errors);
            // } else {
            //     handleAddErrorMessages([
            //         { msg: "Something went wrong. Please try again." }
            //     ]);
            // }
        }
    };

    handleOTPSubmit = async event => {
        event.preventDefault();
        this.setState({ waiting: true });
        const { schoolEmail, otp } = this.state;
        const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
        if (!otp) {
            handleAddErrorMessages([{ msg: "OTP is a required field." }]);
            this.setState({ waiting: false });
            return;
        }
        try {
            // const response = await axios.post(
            //     `${process.env.REACT_APP_SERVER_URL}/user/verifyotp`,
            //     {
            //         schoolEmail,
            //         otp
            //     }
            // );
            // this.setState({ waiting: false });
            // localStorage.setItem("jwt", response.data.jwt);
            // handleAddSuccessMessage(response.data.msg);
            // this.props.history.push("/");
            this.setState({ waiting: false });
            handleAddSuccessMessage([
                { msg: "otp Success catch." }
            ]);
        } catch (err) {
            this.setState({ waiting: false });
            handleAddErrorMessages([
                { msg: "Something went wrong. Please try again." }
            ]);
            // if (err.response) {
            //     handleAddErrorMessages(err.response.data.errors);
            // } else {
            //     handleAddErrorMessages([
            //         { msg: "Something went wrong. Please try again." }
            //     ]);
            // }
        }
    };

    signupForm = () => (
        <div>
            <Form onSubmit={this.handleSignupSubmit}>
                <Row>
                    <Col>
                        <Input
                            label="School Name"
                            placeholder="School Name"
                            required
                            name="schoolName"
                            value={this.state.schoolName}
                            type="text"
                            // onChange={(e) => setSchoolName(e.target.value)}
                            onChange={this.handleInputChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label="Email"
                            placeholder="Email"
                            required
                            name="schoolEmail"
                            value={this.state.schoolEmail}
                            type="email"
                            // onChange={(e) => setSchoolEmail(e.target.value)}
                            onChange={this.handleInputChange}
                        />
                    </Col>
                    <Col>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ fontWeight: '500', marginLeft: '10px' }}>Telephone Number</label>
                            <PhoneInput
                                country={'in'}
                                className='form-control'
                                name="schoolPhone"
                                value={this.state.schoolPhone}
                                // onChange={this.handleInputChange}
                                onChange={(schoolPhone) => this.setState({ schoolPhone })}
                            />
                            {/* <div className="text-danger">{errors.school_phone}</div> */}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ fontWeight: '500', marginLeft: '10px' }}>Country</label>
                            <CountryDropdown
                                className='form-control'
                                required
                                name="country"
                                value={this.state.country}
                                onChange={(val) => this.setState({ country: val })}
                            // onChange={(val) => setCountry(val)} 
                            // onChange={this.handleInputChange}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ fontWeight: '500', marginLeft: '10px' }}>Region (State)</label>
                            <RegionDropdown
                                className='form-control'
                                country={this.state.country}
                                required
                                name="region"
                                value={this.state.region}
                                onChange={(val) => this.setState({ region: val })}
                            // onChange={(val) => setRegion(val)} 
                            // this.setState({ waiting: false });
                            // onChange={this.handleInputChange}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label="City"
                            placeholder="City"
                            required
                            name="city"
                            value={this.state.city}
                            type="text"
                            // onChange={(e) => setCity(e.target.value)}
                            onChange={this.handleInputChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ marginBottom: '10px' }} >
                            <label style={{ fontWeight: '500', marginLeft: '10px' }}>Address</label>
                            <textarea
                                className='form-control'
                                style={{ resize: 'none' }}
                                rows="3"
                                placeholder="Address"
                                required
                                name="address"
                                value={this.state.address}
                                type="text"
                                // onChange={(e) => setAddress(e.target.value)}
                                onChange={this.handleInputChange}
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
                            minlength="6"
                            name="password"
                            value={this.state.password}
                            // onChange={(e) => setPassword(e.target.value)}
                            onChange={this.handleInputChange}
                            errorMessage={""}
                        />
                    </Col>
                    <Col>
                        <Password
                            label={"Confirm Password"}
                            placeholder={"Confirm Password"}
                            required
                            minlength="6"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            // onChange={(e) => setConfirmPassword(e.target.value)}
                            onChange={this.handleInputChange}
                        // errorMessage={errors.confirm_password}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.waiting && (<Button variant="primary"  disabled style={{ width: '100%' }}>Please wait...</Button>)}
                        {!this.state.waiting && (<Button variant="primary" type="submit" style={{ width: '100%' }}>Submit</Button>)}
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col>
                    <div style={{ marginTop: '40px', textAlign: 'center' }}>
                        Already have an account? <Link to='/signin'>Login here</Link>
                    </div>
                </Col>
            </Row>
        </div>
    )

    otpForm = () => (
        <div style={{ padding: '20px 40px' }}>
            <Form>
                <Row>
                    <Col>
                        <Input
                            label="OTP"
                            placeholder="000000"
                            required
                            name="otp"
                            value={this.state.otp}
                            type="text"
                            // onChange={(e) => setOtp(e.target.value)}
                            onChange={this.handleInputChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.waiting && (
                            <Button color="primary" disabled>
                                Please wait...
                            </Button>
                        )}
                        {!this.state.waiting && (
                            <Button color="primary" onClick={this.handleOTPSubmit} type="submit">
                                Submit OTP
                            </Button>
                        )}
                    </Col>
                </Row>
            </Form>
        </div>
    )


    render() {
        return (
            <div>
                <div>
                    <div>
                        <div style={{
                            width: '100%',
                            marginTop: '50px',
                            padding: '20px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            {/* <div data-aos="fade-down" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600"> */}
                            {/* <div data-aos="fade-down"> */}
                            <div>
                                <div
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
                                                        <h3>Signup</h3>
                                                    </div>
                                                    {this.state.stage === "signup" && this.signupForm()}
                                                    {this.state.stage === "verifyotp" && this.otpForm()}
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Signup);