import React from 'react';
import { Typography, Container } from '@mui/material';
import AppointmentForm from '../organisms/appointment/AppointmentForm';
// For a richer date/time picking experience, you would typically use @mui/x-date-pickers
// and potentially pass LocalizationProvider here or in App.jsx
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Appointment = () => {
    return (
        // <LocalizationProvider dateAdapter={AdapterDateFns}> // If using @mui/x-date-pickers
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                Book Your Appointment
            </Typography>
            <AppointmentForm />
        </Container>
        // </LocalizationProvider>
    );
};

export default Appointment;