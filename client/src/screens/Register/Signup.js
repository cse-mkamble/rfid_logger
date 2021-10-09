import React, { useEffect, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, InputLabel, Select, MenuItem } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MuiPhoneNumber from "material-ui-phone-number";
import CSCData from "../../countries_states_cities";

const Signup = (props) => {

    const [owner_name, setOwnerName] = useState('');
    const [school_name, setSchoolName] = useState('');
    const [school_email, setSchoolEmail] = useState('');
    const [school_phone, setSchoolPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [countryList, setCountryList] = useState([]);
    const [regionList, setRegionList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [error_confirm_password, setErrorConfirmPassword] = useState('');
    const [is_error_confirm_password, setIsErrorConfirmPassword] = useState(false);
    const [is_errors, setIsErrors] = useState(false);
    const [show_password, setShowPassword] = useState('password');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        // console.log(props)
        // console.log(CSCData)


        setCountryList(CSCData);
    }, [])

    const handleFormValidation = () => {
        let errors = {};
        let formIsValid = true;
        // schoolPhone
        if (!school_phone || school_phone.length < 4) {
            formIsValid = false;
            errors["school_phone"] = "Plese, fill in phone number filed.";
            setIsErrors(true)
        } else { setIsErrors(false) }
        // confirmPassword
        if (password !== "undefined" && confirm_password !== "undefined") {
            if (password !== confirm_password) {
                formIsValid = false;
                errors["confirm_password"] = "❗Confirm passwords didn’t match. Try again.";
            }
        }
        setErrors(errors);
        return formIsValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleFormValidation()) {
            const user = { owner_name, school_name, school_email, school_phone, address, city, region, country, password, confirm_password };
            props.handleAddSuccessMessage("Sent mail. Please check your mail.");
            props.handleNext(user);
        } else {
            props.handleAddErrorMessages([{ msg: "Form has errors." }]);
        }
    };

    const handleCountryValue = (event) => {
        event.preventDefault();
        setCountry(event.target.value)
        if (event.target.value) {
            const result = CSCData.filter(item => item.name === event.target.value);
            const result2 = result.map(item => item.states);
            setRegionList(result2[0]);
        }
    }

    const handleRegionValue = (event) => {
        event.preventDefault();
        setRegion(event.target.value)
        if (event.target.value) {
            const result = regionList.filter(item => item.name === event.target.value);
            const result2 = result.map(item => item.cities);
            setCityList(result2[0]);
        }
    }

    const handleOnChangePhoneNumber = (value) => {
        setSchoolPhone(value);
    }

    const signupForm = () => {
        return (
            <div>
                <Container>
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><AccountCircleOutlinedIcon /></Avatar>
                        <Typography component="h1" variant="h5">Create your Account</Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="ownerName"
                                        required
                                        fullWidth
                                        autoFocus
                                        size="small"
                                        label="Owner Full Name"
                                        value={owner_name}
                                        onChange={(e) => setOwnerName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        autoComplete="schoolName"
                                        required
                                        fullWidth
                                        size="small"
                                        label="School Name"
                                        value={school_name}
                                        onChange={(e) => setSchoolName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="email"
                                        size="small"
                                        label="School Email Address"
                                        autoComplete="email"
                                        value={school_email}
                                        onChange={(e) => setSchoolEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <MuiPhoneNumber
                                        fullWidth
                                        size="small"
                                        required
                                        variant="outlined"
                                        label="School Phone Number"
                                        data-cy="user-phone"
                                        defaultCountry={"in"}
                                        error={is_errors}
                                        value={school_phone}
                                        helperText={errors['school_phone']}
                                        // onChange={(event) => setSchoolPhone(event.target.value)}
                                        onChange={handleOnChangePhoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="address"
                                        required
                                        fullWidth
                                        size="small"
                                        label="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <TextField
                                        select
                                        required
                                        fullWidth
                                        size="small"
                                        label="Country"
                                        value={country}
                                        onChange={(event) => handleCountryValue(event)}
                                    >
                                        {countryList.map((option) => (
                                            <MenuItem key={option.name} value={option.name}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <TextField
                                        select
                                        required
                                        fullWidth
                                        size="small"
                                        label="State/Province/Region"
                                        value={region}
                                        onChange={(event) => handleRegionValue(event)}
                                    // helperText="Please select your region"
                                    >
                                        {regionList.map((option) => (
                                            <MenuItem key={option.name} value={option.name}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <TextField
                                        autoComplete="city"
                                        select
                                        required
                                        fullWidth
                                        size="small"
                                        label="Town/City"
                                        value={city}
                                        onChange={(event) => setCity(event.target.value)}
                                    // helperText="Please select your city"
                                    >
                                        {cityList.map((option) => (
                                            <MenuItem key={option.name} value={option.name}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        size="small"
                                        label="Password"
                                        type={show_password}
                                        inputProps={{ minLength: 6 }}
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        helperText="Use 6 or more characters with a mix of letters, numbers & symbols"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        size="small"
                                        label="Confirm"
                                        type={show_password}
                                        inputProps={{ minLength: 6 }}
                                        autoComplete="new-password"
                                        helperText={error_confirm_password}
                                        error={is_error_confirm_password}
                                        value={confirm_password}
                                        onChange={(event) => {
                                            setConfirmPassword(event.target.value)
                                            if (event.target.value) {
                                                if (event.target.value !== password) {
                                                    setErrorConfirmPassword('❗Those passwords didn’t match. Try again.');
                                                    setIsErrorConfirmPassword(true);
                                                } else {
                                                    setErrorConfirmPassword('');
                                                    setIsErrorConfirmPassword(false);
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value={show_password} color="primary" onClick={(event => { if (show_password === 'password') { setShowPassword('text') } else { setShowPassword('password') } })} />}
                                        label="Show Password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >Submit</Button>
                            <Grid sx={{ m: 2 }} container justifyContent="center">
                                <Grid item>Already have an account? <Link href="/signin">Sign in</Link></Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </div >
        )
    }

    return (
        <div>
            {signupForm()}
        </div>
    );
};

export default Signup;