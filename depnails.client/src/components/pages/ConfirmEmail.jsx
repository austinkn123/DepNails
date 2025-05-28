import { Typography, Box, Container, IconButton, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ConfirmEmail = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
            }}>
                <IconButton
                    component={RouterLink}
                    to="/"
                    sx={{ position: 'absolute', top: 8, left: 8 }}
                    aria-label="go to home page"
                >
                </IconButton>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Confirm Your Email
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Thank you for signing up! A confirmation email has been sent to your email address. Please check your inbox and click the link to activate your account.
                </Typography>
                <Button
                    component={RouterLink}
                    to="/"
                    variant="contained"
                    color="primary"
                >
                    Go to Homepage
                </Button>
            </Box>
        </Container>
    );
};

export default ConfirmEmail;
