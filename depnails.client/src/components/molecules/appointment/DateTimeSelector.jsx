import React from 'react';
import { TextField, Grid } from '@mui/material';

const DateTimeSelector = ({ dateValue, timeValue, handleDateChange, handleTimeChange }) => {
    return (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="date"
                    name="date"
                    label="Preferred Date"
                    type="date"
                    value={dateValue}
                    onChange={handleDateChange} // Or a general handleChange if name attribute is used consistently
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="time"
                    name="time"
                    label="Preferred Time"
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange} // Or a general handleChange
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                />
            </Grid>
        </>
    );
};

export default DateTimeSelector;
