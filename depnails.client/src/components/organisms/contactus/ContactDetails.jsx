import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material'; // Added Grid
import ContactInfoItem from '../../molecules/contactus/ContactInfoItem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Placeholder data
const contactDetailsData = {
    address: "14926 W 87th St Pkwy, Lenexa, KS 66215",
    phone: "(913) 492-1144",
    email: "austinkn123@gmail.com",
    hours: [
        "Monday - Saturday: 9:45 AM - 6:00 PM",
        "Sunday: 9:00 AM - 3:00 PM"
    ]
};

const ContactDetails = () => {
    return (
        <>
            <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3 }}>
                Get In Touch
            </Typography>
        <Paper elevation={3} sx={{ p: 3, height: '100%', my: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ mb: 3 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={6}>
                        <ContactInfoItem 
                            icon={<LocationOnIcon />} 
                            primaryText="Our Address" 
                            secondaryText={contactDetailsData.address} 
                        />
                    </Grid>
                    <Grid size={6}>
                        <ContactInfoItem 
                            icon={<PhoneIcon />} 
                            primaryText="Call Us"
                            secondaryText={contactDetailsData.phone} 
                        />
                    </Grid>
                    <Grid size={6}>
                        <ContactInfoItem 
                            icon={<EmailIcon />} 
                            primaryText="Email Us"
                            secondaryText={contactDetailsData.email} 
                        />
                    </Grid>
                    <Grid size={6}>
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
                    </Grid>

                </Grid>
            </Box>
            <Box sx={{ mb: 3 }}>
                <Box sx={{ height: '100%', minHeight: 200, backgroundColor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                        [Map Placeholder - e.g., Google Maps iframe]
                    </Typography>
                </Box>
            </Box>
            
        </Paper>
        </>
    );
};

export default ContactDetails;
