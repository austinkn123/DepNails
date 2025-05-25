import { Typography, TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../queries/Auth'; // Import the login mutation

const Login = () => {
    const loginMutation = loginUser();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                await loginMutation.mutateAsync(values);
                // Handle successful login, e.g., redirect to home page or show success message
                // You might want to use react-router-dom for navigation: navigate('/');
            } catch (error) {
                // Error is already handled in the mutation's onError callback
                // You can add additional UI feedback here if needed
            }
        },
    });

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h3" component="h2" gutterBottom align="center">
                Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    margin="normal"
                />
                <TextField
                    fullWidth
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
        </Box>
    );
}

export default Login;