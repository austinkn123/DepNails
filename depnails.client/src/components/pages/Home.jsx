import { Typography, Container, Box } from '@mui/material';
import { getAllAppointments } from '../../../queries/Home';
import HeroSection from '../organisms/home/HeroSection';
import FeaturedServicesSection from '../organisms/home/FeaturedServicesSection';
import TechniciansSection from '../organisms/home/TechniciansSection';

const Home = () => {
    const { data: appointments, loading } = getAllAppointments();

    return (
        <Container maxWidth="lg">
            <HeroSection />
            <FeaturedServicesSection />
            <TechniciansSection />
            {appointments && (
                <Box sx={{ my: 4 }}>
                    <Typography variant="h5" component="h3" gutterBottom align="center">
                        Existing Appointments (Debug)
                    </Typography>
                    <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto' }}>
                        {JSON.stringify(appointments, null, 2)}
                    </pre>
                </Box>
            )}
        </Container>
    );
}

export default Home;