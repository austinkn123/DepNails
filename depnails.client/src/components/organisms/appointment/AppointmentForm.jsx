import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import {
    Button,
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Divider
} from '@mui/material';
import ServiceSelector from '../../molecules/appointment/ServiceSelector';
import TechnicianSelector from '../../molecules/appointment/TechnicianSelector';
import DateTimeSelector from '../../molecules/appointment/DateTimeSelector';
import PersonalInfoFields from '../../molecules/appointment/PersonalInfoFields';
import NotesField from '../../molecules/appointment/NotesField';
import { useAuth } from '../../../context/AuthContext';

// Placeholder data - replace with actual data fetching or pass as props
const availableServices = [
    { id: '1', name: 'Manicure', description: 'Classic manicure with polish.', duration: 30, price: 25 },
    { id: '2', name: 'Pedicure', description: 'Relaxing pedicure with foot massage.', duration: 45, price: 35 },
    { id: '3', name: 'Nail Art', description: 'Custom nail art design.', duration: 60, price: 50 },
    { id: '4', name: 'Gel Extensions', description: 'Durable and beautiful gel extensions.', duration: 90, price: 70 },
];

const availableTechnicians = [
    { id: '1', name: 'Jane Doe' },
    { id: '2', name: 'Alex Smith' },
    { id: '3', name: 'Sarah Lee' },
];

const AppointmentForm = () => {
    const { isAuthenticated, userProfile, isLoadingProfile } = useAuth();

    useEffect(() => {
        console.log('User Profile:', userProfile);
    }, [userProfile]);

    const initialValues = {
        clientId: userProfile?.clientId || 0,
        firstName: userProfile?.firstName || '',
        lastName: userProfile?.lastName || '',
        email: userProfile?.email || '',
        phone: userProfile?.phoneNumber || '',

        technicianId: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
        services: [],
        status: 'pending',
    };

    const validate = (values) => {
        const errors = {};
        
        // Only validate personal info if user is not authenticated
        if (!isAuthenticated) {
            if (!values.firstName) errors.firstName = 'First name is required';
            if (!values.lastName) errors.lastName = 'Last name is required';
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = 'Email address is invalid';
            }
            if (!values.phone) {
                errors.phone = 'Phone number is required';
            } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.phone)) {
                errors.phone = 'Phone number is invalid';
            }
        }
        
        // Always validate appointment details
        if (!values.technicianId) errors.technicianId = 'Please select a technician';
        if (!values.appointmentDate) errors.appointmentDate = 'Please select a date';
        if (!values.appointmentTime) errors.appointmentTime = 'Please select a time';
        if (values.services.length === 0) errors.services = 'Please select at least one service';

        return errors;
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log('Form submission started...');
        console.log('Is Authenticated:', isAuthenticated);
        console.log('User Profile:', userProfile);
        console.log('Form Values:', values);
        
        // For authenticated users, ensure personal info is included from userProfile
        const appointmentData = {
            ...values,
            firstName: isAuthenticated ? (userProfile?.firstName || values.firstName) : values.firstName,
            lastName: isAuthenticated ? (userProfile?.lastName || values.lastName) : values.lastName,
            email: isAuthenticated ? (userProfile?.email || values.email) : values.email,
            phone: isAuthenticated ? (userProfile?.phoneNumber || values.phone) : values.phone,
        };
        
        console.log('Final Appointment Data:', appointmentData);
        alert('Appointment requested! (Check console for data)');
        setSubmitting(false);
        // Don't reset form immediately to allow debugging
        // resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
            enableReinitialize 
        >
            {(formikProps) => (
                <Form>
                    <Box sx={{ mt: 3, width: '100%', maxWidth: 900, mx: 'auto', px: 2 }}>
                        <Typography variant="h4" gutterBottom align="center">
                            Book Your Appointment
                        </Typography>
                        
                        {isAuthenticated && isLoadingProfile && (
                            <Box sx={{ textAlign: 'center', mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Loading your profile information...
                                </Typography>
                            </Box>
                        )}
                        
                        <Grid container spacing={4}>
                            {!isAuthenticated && (
                                <Grid size={{ xs: 12 }}>
                                    <Card>
                                        <CardHeader title="Personal Information" />
                                        <CardContent>
                                            <PersonalInfoFields formikProps={formikProps} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}

                            <Grid size={{ xs: 12 }}>
                                <Card>
                                    <CardHeader title="Appointment Details" />
                                    <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid size={{ xs: 12 }}>
                                                <TechnicianSelector technicians={availableTechnicians} formikProps={formikProps} />
                                            </Grid>
                                            <Grid size={{ xs: 12 }}><Divider /></Grid>
                                            <Grid size={{ xs: 12 }}>
                                                <ServiceSelector services={availableServices} formikProps={formikProps} />
                                            </Grid>
                                            <Grid size={{ xs: 12 }}><Divider /></Grid>
                                            <Grid size={{ xs: 12 }}>
                                                <DateTimeSelector formikProps={formikProps} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Card>
                                    <CardHeader title="Additional Notes" />
                                    <CardContent>
                                        <NotesField formikProps={formikProps} />
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={formikProps.isSubmitting}
                                    sx={{ px: 5, py: 1.5 }}
                                >
                                    Request Appointment
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default AppointmentForm;
