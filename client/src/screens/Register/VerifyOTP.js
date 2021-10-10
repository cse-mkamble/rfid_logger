import React, { useState } from "react";
import { Button, TextField, Grid, Box, Container } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import OTPInput from "../../components/UI/OTPInput";

const VerifyOTP = (props) => {

    const [OTP, setOTP] = useState('');

    const handleOTPSubmit = (event) => {
        event.preventDefault();
        if (OTP && OTP.length === 6) {
            props.handleNext(OTP);
        } else {
            props.handleAddErrorMessages([{ msg: "The OTP you entered is invalid. Please enter the correct OTP." }]);
        }
    };

    return (
        <div>
            <div style={{ width: '600px', textAlign: 'center', padding: '30px' }}>
                <Container>
                    <h4>Please Enter the OTP to Verify your Account</h4>
                    <div>A OTP (one time Password) has been sent to mail</div>
                    <Box component="form" onSubmit={handleOTPSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <OTPInput
                                    autoFocus
                                    isNumberInput
                                    length={6}
                                    className="otpContainer"
                                    inputClassName="otpInput"
                                    onChangeOTP={(otp) => setOTP(otp)}
                                // onChangeOTP={(otp) => this.state({ otp })}
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
                                    type="submit"
                                    color="primary"
                                    endIcon={<SendIcon />}
                                >Resend OTP</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default VerifyOTP;