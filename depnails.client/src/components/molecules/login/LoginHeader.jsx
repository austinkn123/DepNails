import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

const LoginHeader = () => {
    return (
        <>
            <IconButton
                component={RouterLink}
                to="/"
                sx={{ position: 'absolute', top: 8, left: 8 }}
                aria-label="go to home page"
            >
                <HomeIcon />
            </IconButton>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
        </>
    );
};

export default LoginHeader;
