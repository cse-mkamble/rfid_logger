import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Container } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AOS from 'aos';
import 'aos/dist/aos.css';

const VerifySendMail = (props) => {

    AOS.init({});

    const [isSent, setIsSent] = useState(true);
    const [change_email, setChangeEmail] = useState(false);

    useEffect(() => {

    }, []);

    const handleSendMail = (event) => {
        event.preventDefault();
        if (props.state.school_email) {
            props.handleSubmitSendMail();
            setIsSent(true);
            props.handleAddSuccessMessage("Sent mail. Please check your mail.");
        } else {
            props.handleAddErrorMessages([{ msg: "Please enter your mail." }]);
        }
    };

    const changeEmailForm = () => (
        <div style={{ padding: '0 200px' }}>
            <Box component="form" onSubmit={handleSendMail} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            variant="standard"
                            type="email"
                            size="small"
                            label="School Email Address"
                            autoComplete="email"
                            autoFocus
                            name='school_email'
                            value={props.state.school_email}
                            onChange={props.handleInputChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ m: 2 }}
                    endIcon={<SendIcon />}
                >Send</Button>
            </Box>
        </div>
    )

    return (
        <div data-aos="fade-left">
            <Container>
                <div style={{ display: 'flex', justifyContent: 'center', height: '160px' }} >
                    <img style={{ width: '240px' }} src="https://res.cloudinary.com/mayurkamble/image/upload/v1632983921/icon/ofxp8e2ghdiodfggfe8e.gif" alt='SentMail gif' />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3>One-Time PIN</h3>
                    <div style={{ padding: '20px 40px' }} >
                        <div>6-digit code has been sent via message.</div>
                        <div>Please, check your mail.</div>
                    </div>
                    <div>
                        {!change_email ? (<div>
                            <div>Is this your mail?</div>
                            <h4>{props.state.school_email}</h4>
                            <Button color="primary" onClick={() => {
                                setIsSent(false)
                                setChangeEmail(true)
                            }} >Not your mail?</Button>
                        </div>) : (<div>
                            {changeEmailForm()}
                        </div>)}
                    </div>
                    <Grid container spacing={3} sx={{ mt: 4 }}>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Button variant="contained" onClick={props.handleBack} >Back</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        if (props.state.school_email) {
                                            if (isSent) {
                                                props.handleNext();
                                            } else {
                                                props.handleAddErrorMessages([{ msg: "Please, Click Sent Button." }]);
                                            }
                                        } else {
                                            props.handleAddErrorMessages([{ msg: "Please enter your mail." }]);
                                        }
                                    }}
                                >Yes, Code has get in mail</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default VerifySendMail;