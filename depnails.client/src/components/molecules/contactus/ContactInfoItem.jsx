import React from 'react';
import { Box, Typography, Icon } from '@mui/material';

const ContactInfoItem = ({ icon, primaryText, secondaryText }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Icon sx={{ mr: 2, color: 'primary.main' }}>{icon}</Icon>
            <Box>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium' }}>
                    {primaryText}
                </Typography>
                {secondaryText && (
                    <Typography variant="body2" color="text.secondary">
                        {secondaryText}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ContactInfoItem;
