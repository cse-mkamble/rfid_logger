import React, { Component } from "react";
import { Avatar, Typography, Stepper, Step, StepLabel, Container, Paper, Box } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Signup from "./Signup";
import VerifySendMail from "./VerifySendMail";
import VerifyOTP from "./VerifyOTP";

const steps = ['Form', 'Verify Mail', 'Verify OTP'];

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            owner_name: '',
            school_name: '',
            school_email: '',
            school_phone: '',
            address: '',
            city: '',
            region: '',
            country: '',
            password: '',
            confirm_password: '',
            OTP: '',
            activeStep: 0
        };
    }

    componentDidMount() {

    }

    handleSelectInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handlePhoneInputChange = (phone) => {
        this.setState({ school_phone: phone });
    };

    getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <Signup
                        handleNext={this.handleNext}
                        state={this.state}
                        handleSelectInputChange={this.handleSelectInputChange}
                        handleInputChange={this.handleInputChange}
                        handlePhoneInputChange={this.handlePhoneInputChange}
                        handleSubmitSentMail={this.handleSubmitSentMail}
                        handleAddErrorMessages={this.props.handleAddErrorMessages}
                        handleAddSuccessMessage={this.props.handleAddSuccessMessage} />
                );
            case 1:
                return (
                    <VerifySendMail
                        handleNext={this.handleNext}
                        handleBack={this.handleBack}
                        state={this.state}
                        handleSelectInputChange={this.handleSelectInputChange}
                        handleInputChange={this.handleInputChange}
                        handleSubmitSentMail={this.handleSubmitSentMail}
                        handleAddErrorMessages={this.props.handleAddErrorMessages}
                        handleAddSuccessMessage={this.props.handleAddSuccessMessage} />
                );
            case 2:
                return (
                    <VerifyOTP
                        handleNext={this.handleNext}
                        handleBack={this.handleBack}
                        state={this.state}
                        handleSelectInputChange={this.handleSelectInputChange}
                        handleInputChange={this.handleInputChange}
                        handleSubmitSentMail={this.handleSubmitSentMail}
                        handleSubmitVerifyOTP={this.handleSubmitVerifyOTP}
                        handleAddErrorMessages={this.props.handleAddErrorMessages}
                        handleAddSuccessMessage={this.props.handleAddSuccessMessage} />
                );
            default:
                throw new Error('Unknown step');
        }
    }

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 });
    };

    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 });
    };

    handleSignUpNext2 = (data) => {
        this.setState({ activeStep: this.state.activeStep + 1 });
        const { school_phone, address, city, region, country, password, confirm_password } = data;
        this.setState({ school_phone, address, city, region, country, password, confirm_password });
        this.handleSentEmail(data, '')
    };

    handleVerifySendMailNext = (data) => {
        this.setState({ activeStep: this.state.activeStep + 1 });
    };

    handleVerifyOTPNext = (data) => {
        this.setState({ activeStep: this.state.activeStep + 1 });
        // console.log(data);
    };

    handleSubmitSentMail = () => {
        console.log(this.state)
    }

    handleSubmitVerifyOTP = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Box style={{ padding: '0 100px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }} direction="row" spacing={2}>
                                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} ><AccountCircleOutlinedIcon /></Avatar>
                            </div>
                            <Typography component="h1" variant="h4" align="center">Create your Account</Typography>
                            <Stepper activeStep={this.state.activeStep} sx={{ pt: 3, pb: 5 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <React.Fragment>
                            {this.state.activeStep === steps.length ? (
                                <React.Fragment>
                                    <div variant="h5" gutterBottom>
                                        Thank you for your order.
                                    </div>
                                    <div variant="subtitle1">
                                        Your order number is #2001539. We have emailed your order
                                        confirmation, and will send you an update when your order has
                                        shipped.
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {this.getStepContent(this.state.activeStep)}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </Container>
            </div>
        )
    }
}