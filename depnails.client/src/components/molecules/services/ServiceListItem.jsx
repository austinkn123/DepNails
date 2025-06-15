import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';

const ServiceListItem = ({ service }) => {
    return (
        <Card sx={{ display: 'flex', mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            {service.image && (
                <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', sm: 180 }, height: { xs: 150, sm: 'auto' } }}
                    image={service.image}
                    alt={service.name}
                />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {service.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" gutterBottom>
                        {service.duration} - ${service.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p" sx={{ mb: 1 }}>
                        {service.description}
                    </Typography>
                    {service.category && <Chip label={service.category} size="small" sx={{ mr: 1, mb: {xs: 1, sm: 0} }} />}
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>
                    <Button size="small" variant="contained">Book Now</Button>
                    <Button size="small" sx={{ ml: 1 }}>Learn More</Button>
                </Box>
            </Box>
        </Card>
    );
};

export default ServiceListItem;
