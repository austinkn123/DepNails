import React, { useState } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Box,
    Grid,
    Typography
} from '@mui/material';
import ServiceSelector from '../../molecules/appointment/ServiceSelector';
import TechnicianSelector from '../../molecules/appointment/TechnicianSelector';
import DateTimeSelector from '../../molecules/appointment/DateTimeSelector';
import PersonalInfoFields from '../../molecules/appointment/PersonalInfoFields';
import NotesField from '../../molecules/appointment/NotesField';

// Placeholder data - replace with actual data fetching or pass as props
const availableServices = [
    { id: '1', name: 'Manicure', description: '', duration: 30, price: 25 },
    { id: '2', name: 'Pedicure', description: '', duration: 45, price: 35 },
    { id: '3', name: 'Nail Art', description: '', duration: 60, price: 50 },
    { id: '4', name: 'Gel Extensions', description: '', duration: 90, price: 70 },
];

const availableTechnicians = [
    { id: '1', name: 'Jane Doe' },
    { id: '2', name: 'Alex Smith' },
    { id: '3', name: 'Sarah Lee' },
];


const steps = [
    'Personal Info',
    'Select Technician',
    'Date & Time',
    'Select Services',
    'Notes & Review'
];

const AppointmentForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        clientId: '', // Could be mapped from logged-in user or entered
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        technicianId: '',
        appointmentDate: '',
        appointmentTime: '',
        duration: '',
        status: 'pending',
        notes: '',
        services: []
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // For service selection (multi-select)
    const handleServiceChange = (selectedServices) => {
        setFormData(prevState => ({
            ...prevState,
            services: selectedServices
        }));
    };

    // For technician selection
    const handleTechnicianChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            technicianId: event.target.value
        }));
    };

    // For date and time
    const handleDateChange = (event) => {
        setFormData(prevState => ({ ...prevState, appointmentDate: event.target.value }));
    };
    const handleTimeChange = (event) => {
        setFormData(prevState => ({ ...prevState, appointmentTime: event.target.value }));
    };

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };
    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically send the data to your backend API
        console.log('Appointment Data:', formData);
        alert('Appointment requested! (Check console for data)');
    };

    // Step content
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <PersonalInfoFields
                        values={{
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                        }}
                        handleChange={handleChange}
                    />
                );
            case 1:
                return (
                    <TechnicianSelector
                        technicians={availableTechnicians}
                        selectedTechnician={formData.technicianId}
                        handleChange={handleTechnicianChange}
                    />
                );
            case 2:
                return (
                    <DateTimeSelector
                        dateValue={formData.appointmentDate}
                        timeValue={formData.appointmentTime}
                        handleDateChange={handleDateChange}
                        handleTimeChange={handleTimeChange}
                    />
                );
            case 3:
                return (
                    <ServiceSelector
                        services={availableServices}
                        selectedServices={formData.services}
                        handleChange={handleServiceChange}
                        multiple
                    />
                );
            case 4:
                return (
                    <>
                        <NotesField
                            value={formData.notes}
                            handleChange={handleChange}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">Review:</Typography>
                            <pre>{JSON.stringify(formData, null, 2)}</pre>
                        </Box>
                    </>
                );
            default:
                return null;
        }
    };

        return (
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3, width: '100%', maxWidth: 600, mx: 'auto', px: 2 }}
            >
                <Box sx={{ width: '100%', overflowX: 'auto', mb: 4 }}>
                    <Stepper
                        activeStep={activeStep}
                        sx={{ minWidth: 400, width: '100%' }}
                        alternativeLabel
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Grid container spacing={3} justifyContent="center" sx={{ width: '100%' }}>
                    <Grid item xs={12}>
                        {getStepContent(activeStep)}
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                        {activeStep > 0 && (
                            <Button onClick={handleBack} sx={{ mr: 2 }}>
                                Back
                            </Button>
                        )}
                        {activeStep < steps.length - 1 ? (
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ px: 5, py: 1.5 }}
                            >
                                Request Appointment
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
        );
};

export default AppointmentForm;
