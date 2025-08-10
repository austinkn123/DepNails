import { Typography, Box, Container, IconButton, Button, CircularProgress, TextField } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useConfirmEmailUser } from '../../../queries/Auth';
import { useAuth } from '../../context/AuthContext';

const ConfirmEmail = () => {
    const navigate = useNavigate();
    const { login: contextLogin } = useAuth();

    const [confirmationCode, setConfirmationCode] = useState('');
    const [emailForConfirmation, setEmailForConfirmation] = useState(''); // State to hold the email
    const [passwordForConfirmation, setPasswordForConfirmation] = useState(''); // State to hold the password

    // Retrieve email and password from localStorage when component mounts
    useEffect(() => {
        const storedEmail = localStorage.getItem('pendingConfirmationEmail');
        const storedPassword = localStorage.getItem('pendingConfirmationPassword'); // Retrieve password
        if (storedEmail) {
            setEmailForConfirmation(storedEmail);
        }
        if (storedPassword) {
            setPasswordForConfirmation(storedPassword);
        }
    }, []); 

    const {
        confirmEmail,
        isPending,
        isSuccess,
        error,
        reset,
        data: mutationData
    } = useConfirmEmailUser(
        (responseData) => {
            if (responseData && responseData.accessToken) { // Check for accessToken
                contextLogin(responseData.accessToken); // Pass only the accessToken
                localStorage.removeItem('pendingConfirmationEmail');
                localStorage.removeItem('pendingConfirmationPassword');
                navigate('/'); // Navigate immediately
            } else {
                console.error("Confirmation success but no auth data (accessToken) received. Raw response:", responseData);
            }
        },
        (err) => {
            console.error("Confirmation API error:", err);
        }
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(emailForConfirmation)
        console.log(confirmationCode)
        console.log(passwordForConfirmation)
        if (emailForConfirmation && confirmationCode && passwordForConfirmation) { // Check for password
            confirmEmail({
                email: emailForConfirmation,
                confirmationCode: confirmationCode,
                password: passwordForConfirmation // Include password in the mutation
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
                {isSuccess && mutationData && mutationData.accessToken && (
                    <>
                        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 50, mb: 2 }} />
                        <Typography variant="h6" gutterBottom>Email Confirmed Successfully!</Typography>
                        <Typography variant="body1">You are now being redirected...</Typography>
                    </>
                )}
                {isSuccess && !(mutationData && mutationData.accessToken) && (
                    <>
                        <ErrorOutlineIcon color="error" sx={{ fontSize: 50, mb: 2 }} />
                        <Typography variant="h6" gutterBottom>Confirmation Succeeded, Login Failed</Typography>
                        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                            Your email was confirmed, but we couldn't log you in automatically. Please try logging in manually.
                        </Typography>
                        <Button component={RouterLink} to="/login" variant="contained">
                            Go to Login
                        </Button>
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
                                disabled={isPending || !confirmationCode || !emailForConfirmation} // Ensure email is also present
                            >
                                {isPending ? 'Confirming...' : 'Confirm & Login'}
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
