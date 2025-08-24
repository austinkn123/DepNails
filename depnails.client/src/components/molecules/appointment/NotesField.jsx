import React from 'react';
import { TextField, Grid } from '@mui/material';

const NotesField = ({ formikProps }) => {
    const { values, handleChange } = formikProps;
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <TextField
                    fullWidth
                    id="notes"
                    name="notes"
                    label="Notes / Special Requests (Optional)"
                    multiline
                    rows={4}
                    value={values.notes}
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    );
};

export default NotesField;
