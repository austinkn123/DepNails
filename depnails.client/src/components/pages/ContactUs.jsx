import { Typography, Container, Grid, Box } from '@mui/material';
import ContactDetails from '../organisms/contactus/ContactDetails';
import ContactForm from '../organisms/contactus/ContactForm';
import DeveloperInfoSection from '../organisms/contactus/DeveloperInfoSection'; // Import the new component

const ContactUs = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="h6" component="p" color="text.secondary" sx={{ maxWidth: '700px', margin: 'auto' }}>
                    We'd love to hear from you! Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
                </Typography>
            </Box>
            <Grid container spacing={4} alignItems="stretch"> {/* alignItems="stretch" to make Paper components fill height */}
                <Grid item xs={12} md={5}>
                    <ContactDetails />
                </Grid>
                <Grid item xs={12} md={7}>
                    <ContactForm />
                </Grid>
            </Grid>

            {/* Developer Info Section */}
            <Box sx={{ mt: 6 }}> 
                <DeveloperInfoSection />
            </Box>

        </Container>
    );
}

export default ContactUs;