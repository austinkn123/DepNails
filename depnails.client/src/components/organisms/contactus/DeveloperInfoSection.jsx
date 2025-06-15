import React from 'react';
import { Box, Typography, Link, Avatar, Paper, Stack, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

// Replace with your actual information
const developerInfo = {
    name: "Austin", // Your Name
    avatarUrl: "https://via.placeholder.com/150?text=Austin", // Optional: URL to your avatar image
    bio: "Full-stack developer passionate about creating beautiful and functional web applications.",
    githubUrl: "https://github.com/austinkn123", // Your GitHub profile URL
    linkedinUrl: "https://linkedin.com/in/austin-nguyen6545", // Your LinkedIn profile URL
    email: "mailto:youremail@example.com" // Your email address
};

const DeveloperInfoSection = () => {
    return (
        <Paper elevation={2} sx={{ p: 3, mt: 4, backgroundColor: 'background.default' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
                {developerInfo.avatarUrl && (
                    <Avatar
                        alt={developerInfo.name}
                        src={developerInfo.avatarUrl}
                        sx={{ width: 100, height: 100, mb: { xs: 2, sm: 0 } }}
                    />
                )}
                <Box flexGrow={1}>
                    <Typography variant="h5" component="h3" gutterBottom>
                        About the Developer
                    </Typography>
                    <Typography variant="h6" component="h4" gutterBottom>
                        {developerInfo.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {developerInfo.bio}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {developerInfo.githubUrl && (
                            <IconButton href={developerInfo.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                                <GitHubIcon />
                            </IconButton>
                        )}
                        {developerInfo.linkedinUrl && (
                            <IconButton href={developerInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                                <LinkedInIcon />
                            </IconButton>
                        )}
                        {developerInfo.email && (
                            <IconButton href={developerInfo.email} aria-label="Email Developer">
                                <EmailIcon />
                            </IconButton>
                        )}
                    </Stack>
                </Box>
            </Stack>
            <Typography variant="caption" display="block" sx={{ textAlign: 'center', mt: 3, color: 'text.disabled' }}>
                This website was lovingly crafted. 
            </Typography>
        </Paper>
    );
};

export default DeveloperInfoSection;
