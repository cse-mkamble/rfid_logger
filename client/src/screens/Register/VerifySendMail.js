import React, { useState } from "react";
import { Button, TextField, Grid, Box, Container } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const VerifySendMail = (props) => {

    const [school_email, setSchoolEmail] = useState('cse.mkamble@gmail.com');
    const [isSent, setIsSent] = useState(true);
    const [change_email, setChangeEmail] = useState(false);

    const handleSentMail = (event) => {
        event.preventDefault();
        props.handleAddSuccessMessage("Sent mail. Please check your mail.");
        setIsSent(true);
        // const { school_name, school_email, school_phone, address, city, region, country, password, confirm_password } = this.state;
        // const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
        // try {
        //     const user = { school_name, school_email, school_phone, address, city, region, country, password, confirm_password };
        //     this.props.registerSendMail(user)
        //     handleAddSuccessMessage("Sent mail. Please check your mail.");
        // } catch (error) {
        //     handleAddErrorMessages([{ msg: "Something went wrong. Please try again." }]);
        // }
    };

    const changeEmailForm = () => (
        <div>
            <Box component="form" onSubmit={handleSentMail} sx={{ mt: 3 }}>
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
                            value={school_email}
                            onChange={(e) => setSchoolEmail(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    endIcon={<SendIcon />}
                >Send</Button>
            </Box>
        </div>
    )


    return (
        <div>
            <div data-aos="fade-left">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '600px', padding: '10px' }}>
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
                                        {!change_email ? (<div>
                                            <div>Is this your mail?</div>
                                            <h4>{school_email}</h4>
                                            <Button color="primary" onClick={(event) => {
                                                event.preventDefault();
                                                setIsSent(false)
                                                setChangeEmail(true)
                                            }} >Not your mail?</Button>
                                        </div>) : (<div>
                                            {changeEmailForm()}
                                        </div>)}
                                    </div>
                                    <p style={{ color: '#ff00009e', fontSize: '14px', margin: '20px 0' }}>We encountered an error for your request. For transactions, please check your account before trying again.</p>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{ mt: 2, mb: 2 }}
                                        style={{ fontWeight: 'bold' }}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            if (school_email) {
                                                if (isSent) {
                                                    props.handleNext(school_email);
                                                } else {
                                                    props.handleAddErrorMessages([{ msg: "Please, Click Sent Button." }]);
                                                }
                                            } else {
                                                props.handleAddErrorMessages([{ msg: "Please enter your mail." }]);
                                            }
                                        }}
                                    >Yes, Code has get in mail</Button>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifySendMail;