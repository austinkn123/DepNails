import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRegisterUser } from '../../../../queries/Auth';
import { Button, Container, Typography, Box, IconButton, TextField, InputAdornment } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string()
        .transform((value) => (typeof value === 'string' ? value.replace(/[\s()-]/g, '') : value))
        .matches(/^\+1\d{10}$/, 'Phone number must be in +1XXXXXXXXXX format')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[@$!%*?&]/, 'Password must contain a symbol')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
});

const SignUpForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

     const { signUp, isPending, error: mutationError } = useRegisterUser(
        (data, key, values) => { // Accept values from onSubmit
            // Pass only email to the confirmation page
            navigate('/confirm-email', { state: { email: values.email } });
        }
    );

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
            }}>
                <Formik
                    initialValues={{
                        firstName: 'Austin',
                        lastName: 'Nguyen',
                        phoneNumber: '+19136052823',
                        email: 'austinkn123@gmail.com',
                        password: 'P@ssw0rd',
                        confirmPassword: 'P@ssw0rd',
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        const { confirmPassword, ...submissionData } = values;
                        try {
                            // Pass the original values to the signUp function's onSuccess callback
                            await signUp(submissionData, { extraData: values });
                        } catch (err) {
                            console.error('Signup error:', err);
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ errors, touched, handleChange, handleBlur, values, setFieldValue, isSubmitting }) => (
                        <Form style={{ width: '100%', marginTop: '8px' }}>
                            {mutationError && (
                                <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                                    {mutationError?.response?.data?.message || mutationError.message || 'An error occurred during signup.'}
                                </Typography>
                            )}
                            <TextField
                                label="First Name"
                                id="firstName"
                                name="firstName"
                                autoComplete="given-name"
                                type="text"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                required
                                fullWidth
                                margin="normal"
                                autoFocus
                            />
                            <TextField
                                label="Last Name"
                                id="lastName"
                                name="lastName"
                                autoComplete="family-name"
                                type="text"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.lastName && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <MuiTelInput
                                label="Phone Number"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                onChange={(newValue) => setFieldValue('phoneNumber', newValue)}
                                onBlur={handleBlur}
                                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                helperText={touched.phoneNumber && errors.phoneNumber}
                                required
                                fullWidth
                                margin="normal"
                                defaultCountry="US"
                            />
                            <TextField
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                fullWidth
                                margin="normal"
                                required
                                autoComplete="email"
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                required
                                fullWidth
                                margin="normal"
                                autoComplete="new-password"
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
                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                                required
                                fullWidth
                                margin="normal"
                                autoComplete="new-password"
                                componentsProps={{ // Changed from InputProps
                                    root: { // Props are now passed to the 'root' slot
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownConfirmPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isPending || isSubmitting}
                            >
                                {isPending || isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default SignUpForm;