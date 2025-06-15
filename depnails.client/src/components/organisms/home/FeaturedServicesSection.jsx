import React from 'react';
import { Typography, Grid, Box, Button } from '@mui/material';
import ServiceCard from '../../molecules/home/ServiceCard';

// Placeholder data - this might be passed as a prop in a real app
const featuredServices = [
    { name: 'Manicure', description: 'Classic manicure with polish.', image: 'https://via.placeholder.com/300x200?text=Manicure' },
    { name: 'Pedicure', description: 'Relaxing pedicure with massage.', image: 'https://via.placeholder.com/300x200?text=Pedicure' },
    { name: 'Nail Art', description: 'Custom nail art designs.', image: 'https://via.placeholder.com/300x200?text=Nail+Art' },
];

const FeaturedServicesSection = () => {
    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
                Our Popular Services
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {featuredServices.map((service) => (
                    <Grid item key={service.name} xs={12} sm={6} md={4}>
                        <ServiceCard service={service} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button variant="outlined" color="primary">View All Services</Button>
            </Box>
        </Box>
    );
};

export default FeaturedServicesSection;
