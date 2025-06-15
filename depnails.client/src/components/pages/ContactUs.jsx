import { Typography, Container, Grid, Box } from '@mui/material';
import ContactDetails from '../organisms/contactus/ContactDetails';
import ContactForm from '../organisms/contactus/ContactForm';
import DeveloperInfoSection from '../organisms/contactus/DeveloperInfoSection';

const ContactUs = () => {
    return (
        <>
            <Container
                maxWidth="lg"
                sx={{
                    pt: 6,
                    pb: 6, // Padding at the bottom of main content
                    mt: 4,
                    // mb: 4, // Removed, footer's mt will provide separation
                }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="h6" component="p" color="text.secondary" sx={{ maxWidth: '700px', margin: 'auto' }}>
                        We'd love to hear from you! Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
                    </Typography>
                </Box>
                <Box sx={{ 
                    flexDirection: 'column'
                    }}> 
                    <ContactDetails />

                    <ContactForm />
                </Box>
            </Container>
            <Box
                component="footer"
                sx={{
                    mt: 8, 
                }}
            >
                <DeveloperInfoSection />
            </Box>
        </>
    );
}

export default ContactUs;