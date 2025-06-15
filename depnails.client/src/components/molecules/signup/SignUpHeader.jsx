import React from 'react';
import { Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

const SignUpHeader = () => {
    return (
        <>
            <IconButton
                component={RouterLink}
                to="/"
                sx={{ position: 'absolute', top: 8, left: 8 }} // Match styling from SignUp.jsx
                aria-label="go to home page"
            >
                <HomeIcon />
            </IconButton>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
        </>
    );
};

export default SignUpHeader;
