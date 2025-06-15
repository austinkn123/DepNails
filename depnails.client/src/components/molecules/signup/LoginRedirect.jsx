import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const LoginRedirect = () => {
    return (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
                Already have an account?{' '}
                <Button component={RouterLink} to="/login" variant="text" sx={{ textTransform: 'none' }}>
                    Login
                </Button>
            </Typography>
        </Box>
    );
};

export default LoginRedirect;
