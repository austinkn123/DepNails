import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';


const NotFound = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <DoNotDisturbIcon sx={{ fontSize: 100, mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
                Oops! Page Not Found.
            </Typography>
            <Typography variant="body1" gutterBottom>
                The page you are looking for does not exist. It might have been moved or deleted.
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary" sx={{ mt: 2 }}>
                Go to Homepage
            </Button>
        </Box>
    );
}

export default NotFound;
