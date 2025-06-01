import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../../queries/Auth';
import { Button, Container, Typography, Box, IconButton } from '@mui/material'; // Added IconButton
import HomeIcon from '@mui/icons-material/Home'; // Added HomeIcon
import TextFieldAtom from '../atoms/TextFieldAtom';
import { MuiTelInput } from 'mui-tel-input';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Added useNavigate

const SignUpSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
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

const SignUp = () => {
    const navigate = useNavigate();
    const { mutate: signUp, isPending, error: mutationError } = registerUser(
        (data, variables) => { // Modified to get variables
            // Store email in localStorage before navigating
            localStorage.setItem('pendingConfirmationEmail', variables.email);
            //localStorage.setItem('pendingConfirmationPassword', variables.confirmPassword);
            navigate('/confirm-email');
        }
    );

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
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Formik
                    initialValues={{
                        name: 'Austin Nguyen', 
                        phoneNumber: '+19136052823', 
                        email: 'p0rkKch0p123@gmail.com', 
                        password: 'P@ssw0rd', 
                        confirmPassword: 'P@ssw0rd', 
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        try {
                            // Pass the email to the mutation's onSuccess through variables
                            await signUp(values);
                        } catch (err) {
                            // Error is handled by the mutation's error state (mutationError)
                            // or you can set form-level errors if needed:
                            // setErrors({ submit: err.message || 'An error occurred during signup.' });
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ errors, touched, handleChange, handleBlur, values, setFieldValue, isSubmitting }) => (
                        <Form>
                            {/* Display mutation error if present */}
                            {mutationError && (
                                <Typography color="error" sx={{ mb: 2 }}>
                                    {mutationError.message || 'An error occurred during signup.'}
                                </Typography>
                            )}
                            <TextFieldAtom
                                label="Full Name"
                                id="name"
                                name="name"
                                autoComplete="name"
                                type="text"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
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
                            <TextFieldAtom
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
                            />
                            <TextFieldAtom
                                label="Password"
                                name="password"
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextFieldAtom
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                id="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                                required
                                fullWidth
                                margin="normal"
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
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant="body2">
                                    Already have an account?{' '}
                                    <Button component={RouterLink} to="/login" variant="text" sx={{ textTransform: 'none' }}>
                                        Login
                                    </Button>
                                </Typography>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default SignUp;
