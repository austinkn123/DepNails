import React from 'react';
import { TextField, Grid } from '@mui/material';

const PersonalInfoFields = ({ values, handleChange }) => {
    return (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    autoComplete="email"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                />
            </Grid>
        </>
    );
};

export default PersonalInfoFields;
