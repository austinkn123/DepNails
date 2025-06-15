import React, {useState} from 'react';
import { Grid, Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import ServiceListItem from '../../molecules/services/ServiceListItem';
import SearchIcon from '@mui/icons-material/Search'; // Assuming you have MUI icons installed

// Placeholder data - replace with actual data fetching and state management
const allServices = [
    {
        id: '1',
        name: 'Classic Manicure',
        description: 'Includes nail shaping, cuticle care, hand massage, and polish.',
        price: '30',
        duration: '45 mins',
        category: 'Hands',
        image: 'https://via.placeholder.com/180x180?text=Manicure'
    },
    {
        id: '2',
        name: 'Spa Pedicure',
        description: 'Relaxing foot soak, nail shaping, cuticle care, exfoliation, massage, and polish.',
        price: '50',
        duration: '60 mins',
        category: 'Feet',
        image: 'https://via.placeholder.com/180x180?text=Pedicure'
    },
    {
        id: '3',
        name: 'Gel Polish Manicure',
        description: 'Classic manicure with long-lasting gel polish.',
        price: '45',
        duration: '60 mins',
        category: 'Hands',
        image: 'https://via.placeholder.com/180x180?text=Gel+Manicure'
    },
    {
        id: '4',
        name: 'Nail Art Design',
        description: 'Custom nail art for a unique look. Price varies by complexity.',
        price: '15+',
        duration: '30-60 mins',
        category: 'Add-on',
        image: 'https://via.placeholder.com/180x180?text=Nail+Art'
    },
    {
        id: '5',
        name: 'Acrylic Full Set',
        description: 'Durable and versatile nail extensions.',
        price: '65',
        duration: '90 mins',
        category: 'Extensions',
        image: 'https://via.placeholder.com/180x180?text=Acrylics'
    },
];

const ServiceList = () => {
    // Basic search state - in a real app, this would filter `allServices`
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredServices = allServices.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.category && service.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Box sx={{ my: 4 }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                <TextField 
                    label="Search Services"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ width: {xs: '100%', sm: '50%', md: '33%'} }}
                />
            </Box>
            {filteredServices.length > 0 ? (
                <Grid container spacing={0}> 
                    {filteredServices.map((service) => (
                        <Grid item key={service.id} size={12} > 
                            <ServiceListItem service={service} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="subtitle1" align="center" color="text.secondary">
                    No services found matching your search criteria.
                </Typography>
            )}
        </Box>
    );
};

export default ServiceList;
