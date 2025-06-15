import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material'; // Removed TextField, Button
import { useAuth } from '../../context/AuthContext'; // Assuming AuthContext provides user info

const Profile = () => {
    const { user } = useAuth(); // Or however you access the logged-in user's details

    // Placeholder for user data - replace with actual data fetching or context usage
    const userData = user || {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '555-123-4567', // Added phone number
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 128px)' /* Adjust based on your AppBar/Footer height */ }}>
            <Paper sx={{ p: 4, width: '100%', maxWidth: 500 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
                    User Profile
                </Typography>
                <Grid container spacing={3} direction="column">
                    <Grid item>
                        <Typography variant="h6">Name:</Typography>
                        <Typography variant="body1">{userData.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Email:</Typography>
                        <Typography variant="body1" color="textSecondary">{userData.email}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Phone Number:</Typography>
                        <Typography variant="body1" color="textSecondary">{userData.phoneNumber}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Profile;
