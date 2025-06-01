import { Typography, Button, Box, Container, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../../queries/Auth';
import TextFieldAtom from '../atoms/TextFieldAtom';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext'; 

const Login = () => {
    const navigate = useNavigate(); 
    const { login: contextLogin } = useAuth(); // Renamed to avoid conflict
    const loginMutation = loginUser(
        (data) => { 
            console.log('Login successful:', data);
            contextLogin(data.accessToken); // Call context login
            navigate('/'); 
        }
    );

    const formik = useFormik({
        initialValues: {
            email: 'p0rkKch0p123@gmail.com', // Clear initial values
            password: 'P@ssw0rd', // Clear initial values
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'), // Changed from username to email
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                await loginMutation.mutateAsync(values);
            } catch (error) {
                // Error is handled in the mutation's onError callback
            }
        },
    });

    return (
        <Container component="main" maxWidth="xs"> 
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative', // Added for positioning the icon
            }}>
                <IconButton 
                    component={RouterLink} 
                    to="/" 
                    sx={{ position: 'absolute', top: 8, left: 8 }} // Positioned top-left
                    aria-label="go to home page"
                >
                    <HomeIcon />
                </IconButton>
                <Typography component="h1" variant="h5"> {/* Removed id, changed variant */}
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
                        {/* Changed Button to RouterLink */}
                        <Button component={RouterLink} to="/signup" variant="text" sx={{ textTransform: 'none' }}>
                            Create an account
                        </Button>
                    </Typography>
                </Box>
            </Box> {/* Closed Box */} 
        </Container> // Closed Container
    );
}

export default Login;