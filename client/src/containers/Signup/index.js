import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Input from "../../components/UI/Input";
import Password from "../../components/UI/Password";
import OTPInput from '../../components/UI/OTPInput';
import { register, registerSendMail } from "../../redux/actions";
import './index.css';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school_name: "",
            school_email: "",
            school_phone: "",
            address: "",
            city: "",
            region: "",
            country: "",
            password: "",
            confirm_password: "",
            otp: "",
            stage: "signup",
            waiting: false,
            change_email: false,
            fields: {},
            errors: {},
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;

        // schoolPhone
        if (!this.state.school_phone) {
            formIsValid = false;
            errors["school_phone"] = "Plese, fill in telephone number filed.";
        }

        // confirmPassword
        if (this.state.password !== "undefined" && this.state.confirm_password !== "undefined") {
            if (this.state.password != this.state.confirm_password) {
                formIsValid = false;
                errors["confirm_password"] = "Confirm password don't match.";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleSignupSubmit = async event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.setState({ waiting: true });
            const { school_name, school_email, school_phone, address, city, region, country, password, confirm_password } = this.state;
            const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
            try {
                const user = { school_name, school_email, school_phone, address, city, region, country, password, confirm_password };
                this.props.registerSendMail(user)
                const { success, error } = this.props.registerUserSendMailReducer;
                // console.log(this.props.registerUserSendMailReducer)
                if (success) {
                    handleAddSuccessMessage("Sent mail. Please check your mail.");
                    this.setState({ stage: "verifyotpalert" });
                } else {
                    handleAddErrorMessages([{ msg: "Something went wrong. Please try again." }]);
                }
                this.setState({ waiting: false });
            } catch (error) {
                this.setState({ waiting: false });
                handleAddErrorMessages([{ msg: "Something went wrong. Please try again." }]);
            }
        } else {
            this.props.handleAddErrorMessages([{ msg: "Form has errors." }]);
        }
    };

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    signupForm = () => (
        <div>
            <div className='shadow-lg bg-white rounded' style={{ width: '800px', padding: '20px 0' }}>
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <div style={{
                                    textAlign: 'center',
                                    marginBottom: '20px'
                                }}>
                                    <h3>Create your account</h3>
                                    <hr />
                                </div>
                                <div style={{ padding: '10px 40px' }}>
                                    <Form onSubmit={this.handleSignupSubmit}>
                                        <Row>
                                            <Col>
                                                <Input
                                                    label="School Name"
                                                    placeholder="School Name"
                                                    required
                                                    name="school_name"
                                                    value={this.state.school_name}
                                                    type="text"
                                                    onChange={this.handleInputChange}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Input
                                                    label="School Email"
                                                    placeholder="School Email"
                                                    required
                                                    name="school_email"
                                                    value={this.state.school_email}
                                                    type="email"
                                                    onChange={this.handleInputChange}
                                                />
                                            </Col>
                                            <Col>
                                                <div style={{ marginBottom: '10px' }}>
                                                    <label>Telephone Number</label>
                                                    <PhoneInput
                                                        required
                                                        country={'in'}
                                                        className='form-control'
                                                        name="school_phone"
                                                        value={this.state.school_phone}
                                                        onChange={(school_phone) => this.setState({ school_phone })}
                                                    />
                                                    <span className="text-danger">{this.state.errors["school_phone"]}</span>
                                                    <br />
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
                                                        name="country"
                                                        value={this.state.country}
                                                        onChange={(val) => this.setState({ country: val })}
                                                    />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div style={{ marginBottom: '10px' }}>
                                                    <label>Region (State)</label>
                                                    <RegionDropdown
                                                        className='form-control'
                                                        country={this.state.country}
                                                        required
                                                        name="region"
                                                        value={this.state.region}
                                                        onChange={(val) => this.setState({ region: val })}
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
                                                    onChange={this.handleInputChange}
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
                                                        name="address"
                                                        value={this.state.address}
                                                        type="text"
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
                                                    minLength="6"
                                                    name="password"
                                                    value={this.state.password}
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
                                                    name="confirm_password"
                                                    value={this.state.confirm_password}
                                                    onChange={this.handleInputChange}
                                                    errorMessage={this.state.errors["confirm_password"]}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div style={{ padding: '10px 100px' }} >
                                                    {this.state.waiting && (<Button variant="primary" disabled style={{ width: '100%' }}>Please wait...</Button>)}
                                                    {!this.state.waiting && (<Button variant="primary" type="submit" style={{ width: '100%' }}>Submit</Button>)}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                                <hr />
                                <Row>
                                    <Col>
                                        <div style={{ textAlign: 'center' }}>
                                            Already have an account? <Link to='/signin'>Login here</Link>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )

    handleChangeEmailTrue = () => {
        this.setState({ change_email: true })
    }

    handleVerifyOtpForm = () => {
        this.setState({ stage: "verifyotp" })
    }

    handleSentMail = event => {
        event.preventDefault();
        const { school_name, school_email, school_phone, address, city, region, country, password, confirm_password } = this.state;
        const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
        try {
            const user = { school_name, school_email, school_phone, address, city, region, country, password, confirm_password };
            this.props.registerSendMail(user)
            handleAddSuccessMessage("Sent mail. Please check your mail.");
        } catch (error) {
            handleAddErrorMessages([{ msg: "Something went wrong. Please try again." }]);
        }
    };

    changeEmailForm = () => (
        <div>
            <Form onSubmit={this.handleSentMail}>
                <Row>
                    <Col>
                        <Input
                            label="Enter school email"
                            placeholder="School Email"
                            required
                            name="school_email"
                            value={this.state.school_email}
                            type="email"
                            onChange={this.handleInputChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button color="primary" type="submit">Sent Mail</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )

    otpFormAlert = () => (
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
                        <div data-aos="fade-down">
                            <div>
                                <div className='shadow-lg bg-white rounded' style={{ width: '600px', padding: '10px 60px 60px' }}>
                                    <div>
                                        <Container>
                                            <div style={{ display: 'flex', justifyContent: 'center' }} >
                                                <img style={{ width: '240px' }} src="https://res.cloudinary.com/mayurkamble/image/upload/v1632983921/icon/ofxp8e2ghdiodfggfe8e.gif" />
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <h3>One-Time PIN</h3>
                                                <div style={{ padding: '20px 40px' }} >
                                                    <div>6-digit code has been sent via message.</div>
                                                    <div>Please, check your mail.</div>
                                                </div>
                                                <div>
                                                    {!this.state.change_email ? (<div>
                                                        <div>Is this your mail?</div>
                                                        <h4>{this.state.school_email}</h4>
                                                        <Button variant="link" onClick={this.handleChangeEmailTrue} >Not your mail?</Button>
                                                    </div>) : (<div>
                                                        {this.changeEmailForm()}
                                                    </div>)}
                                                </div>
                                                <p style={{ color: '#ff00009e', fontSize: '14px', margin: '20px 0' }}>We encountered an error for your request. For transactions, please check your account before trying again.</p>
                                                <Button style={{ fontWeight: 'bold' }} variant='danger' onClick={this.handleVerifyOtpForm} >Yes, Code has get in mail</Button>
                                            </div>
                                        </Container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    handleOTPSubmit = event => {
        event.preventDefault();
        this.setState({ waiting: true });
        const { school_email, otp } = this.state;
        const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
        if (!otp) {
            handleAddErrorMessages([{ msg: "OTP is a required field." }]);
            this.setState({ waiting: false });
            return;
        }
        try {
            // this.props.register()
            this.setState({ waiting: false });
            handleAddSuccessMessage([{ msg: "otp Success catch." }]);
        } catch (error) {
            this.setState({ waiting: false });
            handleAddErrorMessages([{ msg: "Something went wrong. Please try again." }]);
        }
    };

    otpForm = () => (
        <div>
            <div style={{
                width: '100%',
                marginTop: '50px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div data-aos="fade-down">
                    <div>
                        <div className='shadow-lg bg-white rounded' style={{ width: '600px' }}>
                            <div>
                                <Container>
                                    <div style={{ textAlign: 'center', padding: '50px 0' }}>
                                        <h4>Please Enter the OTP to Verify your Account</h4>
                                        <div>A OTP (one time Password) has been sent to mail</div>
                                        <Form onSubmit={this.handleOTPSubmit}>
                                            <Row>
                                                <Col>
                                                    <OTPInput
                                                        autoFocus
                                                        isNumberInput
                                                        length={6}
                                                        className="otpContainer"
                                                        inputClassName="otpInput"
                                                        // onChangeOTP={(otp) => console.log('Number OTP: ', otp)}
                                                        onChangeOTP={(otp) => this.state({ otp })}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div style={{ marginBottom: '10px' }} ><Button variant='danger' size='lg' type='submit' >Validate OTP</Button></div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div><Button variant='none' size='lg' onClick={this.handleSentMail} >Resend OTP</Button></div>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    render() {

        AOS.init({})

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
                            <div data-aos="fade-down">
                                <div>
                                    {this.state.stage === "signup" && this.signupForm()}
                                    {this.state.stage === "verifyotpalert" && this.otpFormAlert()}
                                    {this.state.stage === "verifyotp" && this.otpForm()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        registerUserSendMailReducer: state.registerUserSendMailReducer,
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    register,
    registerSendMail,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Signup));