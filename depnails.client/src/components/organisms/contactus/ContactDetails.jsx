import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ContactInfoItem from '../../molecules/contactus/ContactInfoItem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Placeholder data
const contactDetailsData = {
    address: "123 Nail Salon St, Beauty City, BC 12345",
    phone: "(123) 456-7890",
    email: "contact@depnails.com",
    hours: [
        "Monday - Friday: 9:00 AM - 7:00 PM",
        "Saturday: 10:00 AM - 6:00 PM",
        "Sunday: Closed"
    ]
};

const ContactDetails = () => {
    return (
        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3 }}>
                Get In Touch
            </Typography>
            <ContactInfoItem 
                icon={<LocationOnIcon />} 
                primaryText="Our Address" 
                secondaryText={contactDetailsData.address} 
            />
            <ContactInfoItem 
                icon={<PhoneIcon />} 
                primaryText="Call Us"
                secondaryText={contactDetailsData.phone} 
            />
            <ContactInfoItem 
                icon={<EmailIcon />} 
                primaryText="Email Us"
                secondaryText={contactDetailsData.email} 
            />
            <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium', display: 'flex', alignItems: 'center', mb: 1}}>
                    <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} /> Opening Hours
                </Typography>
                {contactDetailsData.hours.map((line, index) => (
                    <Typography key={index} variant="body2" color="text.secondary" sx={{ ml: 3.5 /* Align with text from ContactInfoItem */}}>
                        {line}
                    </Typography>
                ))}
            </Box>
            {/* Optional: Map Placeholder */}
            <Box sx={{ mt: 3, height: 200, backgroundColor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                    [Map Placeholder - e.g., Google Maps iframe]
                </Typography>
            </Box>
        </Paper>
    );
};

export default ContactDetails;
