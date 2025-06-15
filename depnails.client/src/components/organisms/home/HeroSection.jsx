import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const HeroSection = () => {
    return (
        <Box sx={{ textAlign: 'center', my: 4, py: 4, backgroundColor: 'primary.light', color: 'primary.contrastText', borderRadius: 2 }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome to DepNails!
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
                Your one-stop destination for beautiful nails and relaxation.
            </Typography>
            <Button variant="contained" color="secondary" size="large" sx={{ mt: 2 }}>
                Book an Appointment
            </Button>
        </Box>
    );
};

export default HeroSection;
