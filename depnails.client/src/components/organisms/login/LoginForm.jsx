import React, { useState } from 'react';
import { Formik, Form } from 'formik'; // Changed from useFormik
import * as Yup from 'yup';
import { Button, TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLoginUser } from '../../../../queries/Auth';
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

    const { login, isPending, error: mutationError } = useLoginUser(
        (data) => {
            console.log('Login successful:', data);
            contextLogin(data.accessToken);
            navigate('/');
        }
    );

    return (
        <Formik
            initialValues={{
                email: 'austinkn123@gmail.com',
                password: 'P@ssw0rd',
            }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().required('Password is required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await login(values);
                } catch (error) {
                    console.error("Login submission error:", error);
                }
                setSubmitting(false);
            }}
        >
            {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => ( // Added isSubmitting
                <Form style={{ width: '100%', marginTop: '8px' }}> {/* Changed from form tag to Formik's Form component */}
                    {mutationError && ( // Display mutation error
                        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                            {mutationError?.response?.data?.message || mutationError.message || 'An error occurred during login.'}
                        </Typography>
                    )}
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        value={values.email} // Changed from formik.values.email
                        onChange={handleChange} // Changed from formik.handleChange
                        onBlur={handleBlur} // Changed from formik.handleBlur
                        error={touched.email && Boolean(errors.email)} // Changed from formik.touched/errors
                        helperText={touched.email && errors.email} // Changed from formik.touched/errors
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
                        value={values.password} // Changed from formik.values.password
                        onChange={handleChange} // Changed from formik.handleChange
                        onBlur={handleBlur} // Changed from formik.handleBlur
                        error={touched.password && Boolean(errors.password)} // Changed from formik.touched/errors
                        helperText={touched.password && errors.password} // Changed from formik.touched/errors
                        margin="normal"
                        fullWidth
                        autoComplete="current-password"
                        componentsProps={{ // Changed from InputProps
                            root: { // Props are now passed to the 'root' slot
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
                            }
                        }}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                        disabled={isPending || isSubmitting} // Changed from loginMutation.isPending to isPending || isSubmitting
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isPending || isSubmitting ? 'Logging in...' : 'Login'} {/* Changed from loginMutation.isPending */}
                    </Button>
                    {/* Removed the explicit error display here as it's handled by mutationError above */}
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
