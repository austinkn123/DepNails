import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

const ServiceSelector = ({ services, selectedService, handleChange, name = "service" }) => {
    return (
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
                <InputLabel id="service-select-label">Service</InputLabel>
                <Select
                    labelId="service-select-label"
                    id="service-select"
                    value={selectedService}
                    label="Service"
                    name={name}
                    onChange={handleChange}
                >
                    {services.map((service) => (
                        <MenuItem key={service.id} value={service.id}>
                            {service.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default ServiceSelector;
