import { Container, Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SignUpHeader from '../molecules/signup/SignUpHeader';
import SignUpForm from '../organisms/signup/SignUpForm';
import LoginRedirect from '../molecules/signup/LoginRedirect';

const SignUp = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative', 
            }}>
                <IconButton
                    component={RouterLink}
                    to="/"
                    sx={{ position: 'absolute', top: 8, left: 8 }}
                    aria-label="go to home page"
                >
                    <HomeIcon />
                </IconButton>
                <SignUpHeader />
                <SignUpForm />
                <LoginRedirect />
            </Box>
        </Container>
    );
};

export default SignUp;
