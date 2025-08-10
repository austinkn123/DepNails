import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';

const ServiceSelector = ({ services, selectedServices, onServiceChange }) => {
    // Filter out the placeholder "Select" service if it exists
    const selectableServices = services.filter(s => s.id !== '0');

    const handleServiceClick = (serviceId) => {
        const currentIndex = selectedServices.indexOf(serviceId);
        const newSelectedServices = [...selectedServices];

        if (currentIndex === -1) {
            newSelectedServices.push(serviceId);
        } else {
            newSelectedServices.splice(currentIndex, 1);
        }

        onServiceChange(newSelectedServices);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Select Services</Typography>
            <Grid container spacing={2}>
                {selectableServices.map((service) => (
                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                        <Card 
                            variant="outlined"
                            sx={{ 
                                height: '100%',
                                ...(selectedServices.includes(service.id) && { 
                                    borderColor: 'primary.main', 
                                    borderWidth: 2,
                                    backgroundColor: 'action.selected'
                                })
                            }}
                        >
                            <CardActionArea onClick={() => handleServiceClick(service.id)} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {service.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {service.description || 'No description available.'}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                                        {service.duration} min - ${service.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ServiceSelector;
