import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink

const Logo = ({ sx }) => {
    return (
        <Typography
            variant="h6" // Default variant, can be overridden by sx if needed
            noWrap
            component={RouterLink} // Use RouterLink
            to="/" // Link to home page
            sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                ...sx, // Spread the sx prop to allow overrides
            }}
        >
            Dep Nails
        </Typography>
    );
};

export default Logo;
