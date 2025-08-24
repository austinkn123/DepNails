import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Box, FormControl, FormHelperText } from '@mui/material';

const ServiceSelector = ({ services, formikProps }) => {
    const { values, setFieldValue, errors, touched } = formikProps;

    const handleServiceClick = (serviceId) => {
        const newSelectedServices = [...values.services];
        const currentIndex = newSelectedServices.indexOf(serviceId);

        if (currentIndex === -1) {
            newSelectedServices.push(serviceId);
        } else {
            newSelectedServices.splice(currentIndex, 1);
        }

        setFieldValue('services', newSelectedServices);
    };

    return (
        <FormControl error={touched.services && !!errors.services} fullWidth>
            <Typography variant="h6" gutterBottom>Select Services</Typography>
            <Grid container spacing={2} justifyContent="center">
                {services.map((service) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
                        <Card
                            variant="outlined"
                            sx={{
                                height: '100%',
                                ...(values.services && values.services.includes(service.id) && {
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
            {touched.services && errors.services && <FormHelperText sx={{textAlign: 'center', mt: 1}}>{errors.services}</FormHelperText>}
        </FormControl>
    );
};

export default ServiceSelector;
