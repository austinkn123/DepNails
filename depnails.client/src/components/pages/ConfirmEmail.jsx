import { Typography, Box, Container, IconButton, Button, CircularProgress, TextField } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useConfirmEmailUser } from '../../../queries/Auth';

const ConfirmEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [confirmationCode, setConfirmationCode] = useState('');
    const emailForConfirmation = location.state?.email;

    const {
        confirmEmail,
        isPending,
        isSuccess,
        error,
        reset,
        data: mutationData
    } = useConfirmEmailUser(
        (responseData) => {
            // Email confirmed successfully, navigate to login page
            navigate('/login', { state: { email: emailForConfirmation, message: 'Email confirmed successfully! Please log in.' } });
        },
        (err) => {
            console.error("Confirmation API error:", err);
        }
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(emailForConfirmation)
        console.log(confirmationCode)
        if (emailForConfirmation && confirmationCode) {
            confirmEmail({
                email: emailForConfirmation,
                confirmationCode: confirmationCode
            });
        }
    };

    useEffect(() => {
        return () => {
            reset(); 
        };
    }, [reset]);

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
                {!isSuccess && 
                    <IconButton
                        component={RouterLink}
                        to="/"
                        sx={{ position: 'absolute', top: 8, left: 8 }}
                        aria-label="go to home page"
                        disabled={isPending}
                    >
                        <HomeIcon />
                    </IconButton>
                }
                {isPending && (
                    <>
                        <CircularProgress sx={{ mb: 2 }} />
                        <Typography variant="h6">Confirming your email...</Typography>
                    </>
                )}
                {isSuccess && (
                    <>
                        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 50, mb: 2 }} />
                        <Typography variant="h6" gutterBottom>Email Confirmed Successfully!</Typography>
                        <Typography variant="body1">Redirecting you to the login page...</Typography>
                    </>
                )}
                {!isPending && !isSuccess && (
                    <>
                        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                            Confirm Your Email
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            An email has been sent to: <strong>{emailForConfirmation || 'your email address'}</strong>.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Please enter the confirmation code from the email.
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmationCode"
                                label="Confirmation Code"
                                type="text"
                                id="confirmationCode"
                                autoFocus
                                value={confirmationCode}
                                onChange={(e) => setConfirmationCode(e.target.value)}
                                disabled={isPending}
                            />
                            {!!error && (
                                <Typography color="error" sx={{ mt: 2, mb: 1 }}>
                                    {error?.response?.data?.message || error?.message || 'Confirmation failed. Please check the code and try again.'}
                                </Typography>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isPending || !confirmationCode || !emailForConfirmation}
                            >
                                {isPending ? 'Confirming...' : 'Confirm Email'}
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/signup"
                                fullWidth
                                variant="text"
                                disabled={isPending}
                            >
                                Need to sign up again?
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default ConfirmEmail;
