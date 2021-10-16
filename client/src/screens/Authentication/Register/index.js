import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Avatar, Typography, Stepper, Step, StepLabel, Container, Paper, Box } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Signup from "./Signup";
import VerifySendMail from "./VerifySendMail";
import VerifyOTP from "./VerifyOTP";
import { registerSendMailAction, registerVerifyOTPAction } from '../../../redux/actions'

const steps = ['Form', 'Verify Mail', 'Verify OTP'];

class Register extends Component {

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
            isSend: false,
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
                        handleSubmitSendMail={this.handleSubmitSendMail}
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
                        handleSubmitSendMail={this.handleSubmitSendMail}
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
                        handleSubmitSendMail={this.handleSubmitSendMail}
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

    handleSubmitSendMail = async () => {
        const { success, error, message } = await this.props.registerSendMailAction(this.state);
        if (error) return this.props.handleAddErrorMessages([{ msg: error }]);
        if (success) {
            this.setState({ isSend: true })
            return this.props.handleAddSuccessMessage(message);
        }
    }

    handleSubmitVerifyOTP = async () => {
        const { success, error, message } = await this.props.registerVerifyOTPAction(this.state);
        if (error) return this.props.handleAddErrorMessages([{ msg: error }]);

        // this.handleNext();
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

const mapStateToProps = (state) => ({
    registerUserSendMailReducerState: state.registerUserSendMailReducer,
    registerUserVerifyOTPReducerState: state.registerUserVerifyOTPReducer
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    registerSendMailAction,
    registerVerifyOTPAction
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Register));
