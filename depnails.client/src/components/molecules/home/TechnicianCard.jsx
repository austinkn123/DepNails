import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';

const TechnicianCard = ({ technician }) => {
    return (
        <Card sx={{ textAlign: 'center' }}>
            <CardMedia
                component="img"
                height="150"
                image={technician.image}
                alt={technician.name}
                sx={{ borderRadius: '50%', width: 150, height: 150, margin: 'auto', mt: 2 }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {technician.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {technician.specialty}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TechnicianCard;
