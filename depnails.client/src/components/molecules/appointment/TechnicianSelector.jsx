import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Box, FormControl, FormHelperText } from '@mui/material';

const TechnicianSelector = ({ technicians, formikProps }) => {
    const { values, setFieldValue, errors, touched } = formikProps;

    const handleTechnicianClick = (technicianId) => {
        setFieldValue('technicianId', technicianId);
    };

    return (
        <FormControl error={touched.technicianId && !!errors.technicianId} fullWidth>
            <Typography variant="h6" gutterBottom>Select a Technician</Typography>
            <Grid container spacing={2} justifyContent="center">
                {technicians.map((tech) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tech.id}>
                        <Card
                            variant="outlined"
                            sx={{
                                height: '100%',
                                ...(values.technicianId && values.technicianId === tech.id && {
                                    borderColor: 'primary.main',
                                    borderWidth: 2,
                                    backgroundColor: 'action.selected'
                                })
                            }}
                        >
                            <CardActionArea onClick={() => handleTechnicianClick(tech.id)} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {tech.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {touched.technicianId && errors.technicianId && <FormHelperText sx={{textAlign: 'center', mt: 1}}>{errors.technicianId}</FormHelperText>}
        </FormControl>
    );
};

export default TechnicianSelector;
