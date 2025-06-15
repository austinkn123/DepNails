import { Typography, Container, Box } from '@mui/material';
import ServiceList from '../organisms/services/ServiceList';


const Services = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Our Services
                </Typography>
                <Typography variant="h6" component="p" color="text.secondary">
                    Discover our wide range of nail care and beauty treatments designed to make you look and feel your best.
                </Typography>
            </Box>
            <ServiceList />
        </Container>
    );
}

export default Services;
