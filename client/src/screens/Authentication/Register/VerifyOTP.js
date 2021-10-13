import React from "react";
import { Button, Grid, Box, Container } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AOS from 'aos';
import 'aos/dist/aos.css';
import OTPInput from "../../../components/UI/OTPInput";

const VerifyOTP = (props) => {

    AOS.init({});

    const handleOTPSubmit = (event) => {
        event.preventDefault();
        if (props.state.OTP && props.state.OTP.length === 6) {
            props.handleSubmitVerifyOTP();
        } else {
            props.handleAddErrorMessages([{ msg: "The OTP you entered is invalid. Please enter the correct OTP." }]);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} >
            <div data-aos="fade-left">
                <div style={{ textAlign: 'center' }}>
                    <Container>
                        <h4>Please Enter the OTP to Verify your Account</h4>
                        <div>A OTP (one time Password) has been sent to mail</div>
                        <Box component="form" onSubmit={handleOTPSubmit} sx={{ mt: 2 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <OTPInput
                                        autoFocus
                                        isNumberInput
                                        length={6}
                                        className="otpContainer"
                                        inputClassName="otpInput"
                                        name='OTP'
                                        onChangeOTP={(otp) => props.handleSelectInputChange('OTP', otp)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                    >Validate OTP</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        color="primary"
                                        endIcon={<SendIcon />}
                                        onClick={() => props.handleSubmitSendMail()}
                                    >Resend OTP</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Button variant="contained" onClick={props.handleBack} >Back</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;