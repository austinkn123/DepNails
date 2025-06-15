import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Here you would typically send the data to your backend or a service like EmailJS
        alert("Message sent! (Check console for data)");
        // Optionally clear form
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3 }}>
                Send Us a Message
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            name="name"
                            label="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="subject"
                            name="subject"
                            label="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="message"
                            name="message"
                            label="Your Message"
                            multiline
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'right' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 1 }}
                        >
                            Send Message
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default ContactForm;
