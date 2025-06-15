import { Typography, Container } from '@mui/material';
import AppointmentForm from '../organisms/appointment/AppointmentForm';

const Appointment = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                Book Your Appointment
            </Typography>
            <AppointmentForm />
        </Container>
    );
};

export default Appointment;