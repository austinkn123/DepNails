import { Typography, Button, Box, Modal, Paper } from '@mui/material'; // Added Modal, Paper
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../../queries/Auth';
import TextFieldAtom from '../atoms/TextFieldAtom'; // Import TextFieldAtom

const Login = ({ open, handleClose, onSwitchToSignUp }) => {
    const loginMutation = loginUser();

    const formik = useFormik({
        initialValues: {
            email: 'austinkn123@gmail.com', // Changed from username to email
            password: 'P@ssw0rd',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'), // Changed from username to email
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                await loginMutation.mutateAsync(values);
                handleClose(); // Close modal on successful login
            } catch (error) {
                // Error is handled in the mutation's onError callback
            }
        },
    });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
        >
            <Paper sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}>
                <Typography id="login-modal-title" variant="h6" component="h2" gutterBottom align="center">
                    Login
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextFieldAtom
                        id="email" // Changed from username to email
                        name="email" // Changed from username to email
                        label="Email" // Changed from Username to Email
                        value={formik.values.email} // Changed from username to email
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)} // Changed from username to email
                        helperText={formik.touched.email && formik.errors.email} // Changed from username to email
                        margin="normal"
                        fullWidth // Assuming TextFieldAtom supports this or handles it internally
                    />
                    <TextFieldAtom
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                        fullWidth // Assuming TextFieldAtom supports this or handles it internally
                    />
                    <Button 
                        color="primary" 
                        variant="contained" 
                        fullWidth 
                        type="submit" 
                        disabled={loginMutation.isPending}
                        sx={{ mt: 2 }}
                    >
                        {loginMutation.isPending ? 'Logging in...' : 'Login'}
                    </Button>
                    {loginMutation.isError && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {loginMutation.error.message || 'An error occurred during login.'}
                        </Typography>
                    )}
                </form>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                        Don&apos;t have an account?{' '}
                        {/* Changed to call onSwitchToSignUp prop */}
                        <Button variant="text" onClick={() => { handleClose(); onSwitchToSignUp(); }} sx={{ textTransform: 'none' }}>
                            Create an account
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Modal>
    );
}

export default Login;