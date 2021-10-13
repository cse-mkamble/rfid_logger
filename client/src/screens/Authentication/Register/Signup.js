import React, { useEffect, useState } from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Container, MenuItem } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import AOS from 'aos';
import 'aos/dist/aos.css';
import CSCData from "../../../countries_states_cities.json";

const Signup = (props) => {

    AOS.init({});

    const [countryList, setCountryList] = useState([]);
    const [regionList, setRegionList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [error_confirm_password, setErrorConfirmPassword] = useState('');
    const [is_error_confirm_password, setIsErrorConfirmPassword] = useState(false);
    const [is_errors, setIsErrors] = useState(false);
    const [show_password, setShowPassword] = useState('password');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setCountryList(CSCData);
        if (props.state.country) {
            const resultRegion = CSCData.filter(item => item.name === props.state.country);
            const result2Region = resultRegion.map(item => item.states);
            setRegionList(result2Region[0]);
            const resultCities = result2Region[0].filter(item => item.name === props.state.region);
            const result2Cities = resultCities.map(item => item.cities);
            setCityList(result2Cities[0]);
        }
        props.handleSelectInputChange('password', '');
        props.handleSelectInputChange('confirm_password', '');
    }, [])

    const handleFormValidation = () => {
        let errors = {};
        let formIsValid = true;
        // schoolPhone
        if (!props.state.school_phone || props.state.school_phone.length < 4) {
            formIsValid = false;
            errors["school_phone"] = "Plese, fill in phone number filed.";
            setIsErrors(true)
        } else { setIsErrors(false) }
        // confirmPassword
        if (props.state.password !== "undefined" && props.state.confirm_password !== "undefined") {
            if (props.state.password !== props.state.confirm_password) {
                formIsValid = false;
                errors["confirm_password"] = "❗Confirm passwords didn’t match. Try again.";
            }
        }
        setErrors(errors);
        return formIsValid;
    }

    const handleSubmitSignup = (event) => {
        event.preventDefault();
        if (handleFormValidation()) {
            props.handleNext();
        } else {
            props.handleAddErrorMessages([{ msg: "Form has errors." }]);
        }
    };

    const handleCountryValue = (event) => {
        event.preventDefault();
        props.handleInputChange(event)
        if (event.target.value) {
            const result = CSCData.filter(item => item.name === event.target.value);
            const result2 = result.map(item => item.states);
            setRegionList(result2[0]);
        }
    }

    const handleRegionValue = (event) => {
        event.preventDefault();
        props.handleInputChange(event)
        if (event.target.value) {
            const result = regionList.filter(item => item.name === event.target.value);
            const result2 = result.map(item => item.cities);
            setCityList(result2[0]);
        }
    }

    return (
        <div>
            <div data-aos="fade-left">
                <Container>
                    <CssBaseline />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                        <Box component="form" onSubmit={handleSubmitSignup}>
                            <Grid container spacing={3}>

                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="schoolName"
                                        required
                                        fullWidth
                                        autoFocus
                                        size="small"
                                        label="School Name"
                                        name='school_name'
                                        value={props.state.school_name}
                                        onChange={props.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="ownerName"
                                        required
                                        fullWidth
                                        size="small"
                                        label="Owner Full Name"
                                        name='owner_name'
                                        value={props.state.owner_name}
                                        onChange={props.handleInputChange}
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
                                        name='school_phone'
                                        value={props.state.school_phone}
                                        helperText={errors['school_phone']}
                                        onChange={(value) => props.handlePhoneInputChange(value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="address"
                                        required
                                        fullWidth
                                        size="small"
                                        label="Address"
                                        name='address'
                                        value={props.state.address}
                                        onChange={props.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <TextField
                                        select
                                        required
                                        fullWidth
                                        size="small"
                                        label="Country"
                                        name='country'
                                        value={props.state.country}
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
                                        name='region'
                                        value={props.state.region}
                                        onChange={(event) => handleRegionValue(event)}
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
                                        name='city'
                                        value={props.state.city}
                                        onChange={props.handleInputChange}
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
                                        name='password'
                                        value={props.state.password}
                                        onChange={(event) => {
                                            props.handleInputChange(event)
                                        }}
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
                                        name='confirm_password'
                                        value={props.state.confirm_password}
                                        onChange={(event) => {
                                            props.handleInputChange(event)
                                            if (event.target.value) {
                                                if (event.target.value !== props.state.password) {
                                                    setErrorConfirmPassword('❗Those passwords didn’t match.');
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
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Button href="/signin">Sign in instead</Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                        >Next</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </div >
        </div>
    );
};

export default Signup;