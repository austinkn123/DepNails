import React from 'react';
import { TextField, Grid } from '@mui/material';

const NotesField = ({ value, handleChange, name = "notes" }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="notes"
                    name={name}
                    label="Notes / Special Requests (Optional)"
                    multiline
                    rows={4}
                    value={value}
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    );
};

export default NotesField;
