import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
// Removed useNavigate as direct page navigation will be handled differently
import { registerUser } from '../../../queries/Auth';
import { Button, Container, Typography, Box, List, ListItem, ListItemText, Modal, Paper } from '@mui/material'; // Added Modal, Paper
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TextFieldAtom from '../atoms/TextFieldAtom'; // Import the new component

// Changed props: added open, handleClose, onSwitchToLogin
const SignUp = ({ open, handleClose, onSwitchToLogin }) => {
    // Removed username state
    const [name, setName] = useState('Ausitn Nguyen'); // Added name state
    const [phoneNumber, setPhoneNumber] = useState("9136052823");
    const [email, setEmail] = useState('austinkn123@gmail.com');
    const [password, setPassword] = useState('P@ssw0rd');
    const [confirmPassword, setConfirmPassword] = useState('P@ssw0rd');
    const [error, setError] = useState('');
    // Removed navigate initialization

    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        number: false,
        lowercase: false,
        uppercase: false,
        symbol: false,
    });

    const validatePassword = (currentPassword) => {
        const requirements = {
            length: currentPassword.length >= 8,
            number: /\d/.test(currentPassword),
            lowercase: /[a-z]/.test(currentPassword),
            uppercase: /[A-Z]/.test(currentPassword),
            symbol: /[@$!%*?&]/.test(currentPassword),
        };
        setPasswordRequirements(requirements);
        return Object.values(requirements).every(Boolean); // Return true if all requirements are met
    };

    const formatPhoneNumber = (value) => {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, '');
        // Add +1 if it's a 10-digit US number and doesn't already start with +
        if (digits.length === 10 && !value.startsWith('+')) {
            return `+1${digits}`;
        }
        // If it starts with + and has more than 10 digits (e.g. +1xxxxxxxxxx), it's likely already formatted
        if (value.startsWith('+') && digits.length > 10) {
            return `+${digits}`;
        }
        // Otherwise, return the digits prefixed with + if it's not already
        if (!value.startsWith('+')) {
            return `+${digits}`;
        }
        return value; // Fallback for other cases or already formatted numbers
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    // Correctly call registerUser hook to get the mutation object
    const mutation = registerUser(); 

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Use the return value of validatePassword directly
        if (!validatePassword(password)) {
            setError('Password does not meet requirements.');
            return;
        }

        // Pass email, password, name, and phoneNumber to the mutation
        mutation.mutate({ email, password, name, phoneNumber });
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="signup-modal-title"
            aria-describedby="signup-modal-description"
        >
            <Paper sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500, // Increased width from 400 to 500
                maxWidth: '90%', // Added maxWidth to prevent overflow on smaller screens
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                maxHeight: '90vh', // Added for scrollability
                overflowY: 'auto',  // Added for scrollability
            }}>
                <Typography id="signup-modal-title" component="h1" variant="h5" align="center">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                    <TextFieldAtom
                        label="Full Name"
                        id="name"
                        name="name"
                        autoComplete="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth // Added for consistency
                        margin="normal" // Added for consistency
                    />
                    <TextFieldAtom
                        label="Phone Number"
                        id="phoneNumber"
                        name="phoneNumber"
                        autoComplete="tel"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onBlur={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                        required
                    />
                    <TextFieldAtom
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextFieldAtom
                        label="Password"
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <TextFieldAtom
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {password.length > 0 && (
                        <Box sx={{ mt: 2, mb: 2, fontSize: '0.9em' }}>
                            <Typography variant="subtitle2">Password requirements:</Typography>
                            <List dense>
                                <ListItem sx={{ pl: 0 }}>
                                    {passwordRequirements.length ? <CheckCircleIcon color="success" sx={{ mr: 1 }} /> : <CancelIcon color="error" sx={{ mr: 1 }} />}
                                    <ListItemText primary="At least 8 characters" />
                                </ListItem>
                                <ListItem sx={{ pl: 0 }}>
                                    {passwordRequirements.number ? <CheckCircleIcon color="success" sx={{ mr: 1 }} /> : <CancelIcon color="error" sx={{ mr: 1 }} />}
                                    <ListItemText primary="Must contain a number" />
                                </ListItem>
                                <ListItem sx={{ pl: 0 }}>
                                    {passwordRequirements.lowercase ? <CheckCircleIcon color="success" sx={{ mr: 1 }} /> : <CancelIcon color="error" sx={{ mr: 1 }} />}
                                    <ListItemText primary="Must contain a lowercase letter" />
                                </ListItem>
                                <ListItem sx={{ pl: 0 }}>
                                    {passwordRequirements.uppercase ? <CheckCircleIcon color="success" sx={{ mr: 1 }} /> : <CancelIcon color="error" sx={{ mr: 1 }} />}
                                    <ListItemText primary="Must contain an uppercase letter" />
                                </ListItem>
                                <ListItem sx={{ pl: 0 }}>
                                    {passwordRequirements.symbol ? <CheckCircleIcon color="success" sx={{ mr: 1 }} /> : <CancelIcon color="error" sx={{ mr: 1 }} />}
                                    <ListItemText primary="Must contain a symbol (e.g., @$!%*?&)" />
                                </ListItem>
                            </List>
                        </Box>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={mutation.isPending} // Changed from isLoading to isPending
                    >
                        {mutation.isPending ? 'Signing Up...' : 'Sign Up'} {/* Changed from isLoading to isPending */}
                    </Button>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Button variant="text" onClick={() => { handleClose(); onSwitchToLogin(); }} sx={{ textTransform: 'none' }}>
                                Login
                            </Button>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
};

export default SignUp;
