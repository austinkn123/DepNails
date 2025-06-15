import React, { useState } from 'react';
import { Grid, Button, Box } from '@mui/material';
import ServiceSelector from '../../molecules/appointment/ServiceSelector';
import TechnicianSelector from '../../molecules/appointment/TechnicianSelector';
import DateTimeSelector from '../../molecules/appointment/DateTimeSelector';
import PersonalInfoFields from '../../molecules/appointment/PersonalInfoFields';
import NotesField from '../../molecules/appointment/NotesField';

// Placeholder data - replace with actual data fetching or pass as props
const availableServices = [
    { id: '1', name: 'Manicure' },
    { id: '2', name: 'Pedicure' },
    { id: '3', name: 'Nail Art' },
    { id: '4', name: 'Gel Extensions' },
];

const availableTechnicians = [
    { id: '1', name: 'Jane Doe' },
    { id: '2', name: 'Alex Smith' },
    { id: '3', name: 'Sarah Lee' },
];

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        service: '',
        technician: '',
        date: '',
        time: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Specific handlers for date and time if DateTimeSelector needs them separately
    // Or adapt DateTimeSelector to use the general handleChange with name attributes
    const handleDateChange = (event) => {
        setFormData(prevState => ({ ...prevState, date: event.target.value }));
    };

    const handleTimeChange = (event) => {
        setFormData(prevState => ({ ...prevState, time: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Appointment Data:', formData);
        // Here you would typically send the data to your backend API
        alert('Appointment requested! (Check console for data)');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
                <Grid size={6}>
                    <ServiceSelector
                        services={availableServices}
                        selectedService={formData.service}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid size={6}>
                    <TechnicianSelector
                        technicians={availableTechnicians}
                        selectedTechnician={formData.technician}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid size={12}>
                    <DateTimeSelector
                        dateValue={formData.date}
                        timeValue={formData.time}
                        handleDateChange={handleChange} // Using general handleChange
                        handleTimeChange={handleChange} // Using general handleChange
                    />
                </Grid>
                <Grid size={12}>
                    <PersonalInfoFields
                        values={{
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                        }}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid size={6}>
                    <NotesField
                    value={formData.notes}
                    handleChange={handleChange}
                />
                </Grid>
                <Grid size={6}>
                    
                </Grid>
                
                
                
                
                
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 2, px: 5, py: 1.5 }}
                    >
                        Request Appointment
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppointmentForm;
