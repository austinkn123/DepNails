import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, InputAdornment, IconButton, Typography, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { loginUser } from '../../../../queries/Auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login: contextLogin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginMutation = loginUser(
        (data) => {
            console.log('Login successful:', data);
            contextLogin(data.accessToken);
            navigate('/');
        }
        // onError callback is implicitly handled by react-query's error state
    );

    const formik = useFormik({
        initialValues: {
            email: 'p0rkKch0p123@gmail.com', // Default or empty
            password: 'P@ssw0rd', // Default or empty
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                await loginMutation.mutateAsync(values);
            } catch (error) {
                // Error is available in loginMutation.error
                // Formik errors can be set here if needed, but react-query handles mutation state
                console.error("Login submission error:", error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop: '8px' }}> {/* Ensure form takes width and has some margin */}
            <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
                fullWidth
                autoComplete="email"
                autoFocus
            />
            <TextField
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
                fullWidth
                autoComplete="current-password"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loginMutation.isPending}
                sx={{ mt: 3, mb: 2 }} // Adjusted margins
            >
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
            {loginMutation.isError && (
                <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                    {loginMutation.error?.response?.data?.message || loginMutation.error?.message || 'An error occurred during login.'}
                </Typography>
            )}
        </form>
    );
};

export default LoginForm;
