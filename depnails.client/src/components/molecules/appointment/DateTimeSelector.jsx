import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';

const DateTimeSelector = ({ formikProps }) => {
    const { values, handleChange, errors, touched } = formikProps;
    return (
        <>
            <Typography variant="h6" gutterBottom>Select Date & Time</Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        required
                        fullWidth
                        id="appointmentDate"
                        name="appointmentDate"
                        label="Preferred Date"
                        type="date"
                        value={values.appointmentDate}
                        onChange={handleChange}
                        error={touched.appointmentDate && !!errors.appointmentDate}
                        helperText={touched.appointmentDate && errors.appointmentDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        required
                        fullWidth
                        id="appointmentTime"
                        name="appointmentTime"
                        label="Preferred Time"
                        type="time"
                        value={values.appointmentTime}
                        onChange={handleChange}
                        error={touched.appointmentTime && !!errors.appointmentTime}
                        helperText={touched.appointmentTime && errors.appointmentTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default DateTimeSelector;
