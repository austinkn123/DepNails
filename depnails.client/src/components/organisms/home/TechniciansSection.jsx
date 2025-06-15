import React from 'react';
import { Typography, Grid, Box, Button } from '@mui/material';
import TechnicianCard from '../../molecules/home/TechnicianCard';

// Placeholder data - this might be passed as a prop in a real app
const featuredTechnicians = [
    { name: 'Jane Doe', specialty: 'Nail Art Specialist', image: 'https://via.placeholder.com/150?text=Jane+D.' },
    { name: 'Alex Smith', specialty: 'Manicure & Pedicure Expert', image: 'https://via.placeholder.com/150?text=Alex+S.' },
];

const TechniciansSection = () => {
    return (
        <Box sx={{ my: 4, py: 4, backgroundColor: 'grey.100', borderRadius: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
                Meet Our Talented Technicians
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {featuredTechnicians.map((tech) => (
                    <Grid item key={tech.name} xs={12} sm={6} md={3}>
                        <TechnicianCard technician={tech} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button variant="outlined" color="primary">Meet The Team</Button>
            </Box>
        </Box>
    );
};

export default TechniciansSection;
