import React, { Component } from "react";
import { Route, Switch } from "react-router";

import Signup from "./Signup";
import VerifySendMail from "./VerifySendMail";
import VerifyOTP from "./VerifyOTP";

const steps = ['Signup', 'VerifySendMail', 'VerifyOTP'];

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
            activeStep: 0
        };
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <Signup
                        handleNext={this.handleSignUpNext}
                        handleAddErrorMessages={this.props.handleAddErrorMessages}
                        handleAddSuccessMessage={this.props.handleAddSuccessMessage} />
                );
            case 1:
                return (
                    <VerifySendMail
                        handleNext={this.handleVerifySendMailNext}
                        handleAddErrorMessages={this.props.handleAddErrorMessages}
                        handleAddSuccessMessage={this.props.handleAddSuccessMessage} />
                );
            case 2:
                return (
                    <VerifyOTP
                        handleAddErrorMessages={this.props.handleAddErrorMessages}
                        handleAddSuccessMessage={this.props.handleAddSuccessMessage} />
                );
            default:
                throw new Error('Unknown step');
        }
    }

    handleSignUpNext = (data) => {
        this.setState({ activeStep: this.state.activeStep + 1 });
        console.log(data);
    };

    handleVerifySendMailNext = (data) => {
        this.setState({ activeStep: this.state.activeStep + 1 });
        console.log(data);
    };

    render() {
        return (
            <div style={{ width: '100%', marginTop: '40px', padding: '20px', display: 'flex', justifyContent: 'center' }}>
                <div className='bg-white rounded' style={{ width: '800px', border: '1px solid #dadce0' }}>
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
                </div>
            </div>
        )
    }
}