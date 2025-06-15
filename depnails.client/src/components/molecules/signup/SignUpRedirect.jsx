import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const SignUpRedirect = () => {
    return (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
                Don&apos;t have an account?{' '}
                <Button component={RouterLink} to="/signup" variant="text" sx={{ textTransform: 'none' }}>
                    Create an account
                </Button>
            </Typography>
        </Box>
    );
};

export default SignUpRedirect;
