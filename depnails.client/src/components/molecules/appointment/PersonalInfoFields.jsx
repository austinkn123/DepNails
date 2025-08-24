import React from 'react';
import { TextField, Grid } from '@mui/material';

const PersonalInfoFields = ({ formikProps }) => {
    const { values, handleChange, errors, touched } = formikProps;
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    required
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    error={touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    error={touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
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
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
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
                    error={touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                />
            </Grid>
        </Grid>
    );
};

export default PersonalInfoFields;
