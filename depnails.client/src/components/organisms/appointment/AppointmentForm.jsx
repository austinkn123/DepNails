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
    const { isAuthenticated } = useAuth();

    const initialValues = {
        // fix login to be serverside and to have all this info when logged in
        clientId: '', 
        firstName: 'Austin',
        lastName: 'Powers',
        email: 'austin.powers@example.com',
        phone: '123-456-7890',


        technicianId: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
        services: [],
        status: 'pending',
    };

    const validate = (values) => {
        const errors = {};
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
        if (!values.technicianId) errors.technicianId = 'Please select a technician';
        if (!values.appointmentDate) errors.appointmentDate = 'Please select a date';
        if (!values.appointmentTime) errors.appointmentTime = 'Please select a time';
        if (values.services.length === 0) errors.services = 'Please select at least one service';

        return errors;
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log('Appointment Data:', values);
        alert('Appointment requested! (Check console for data)');
        setSubmitting(false);
        resetForm();
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
