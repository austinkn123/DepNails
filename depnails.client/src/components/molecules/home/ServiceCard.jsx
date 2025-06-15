import React from 'react';
import { Button, Typography, Card, CardContent, CardMedia } from '@mui/material';

const ServiceCard = ({ service }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={service.image}
                alt={service.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {service.description}
                </Typography>
                <Button size="small" sx={{ mt: 1 }}>Learn More</Button>
            </CardContent>
        </Card>
    );
};

export default ServiceCard;
