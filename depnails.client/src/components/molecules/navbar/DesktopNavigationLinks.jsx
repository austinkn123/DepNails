import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

const DesktopNavigationLinks = ({ pages }) => {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Button
                    key={page.name}
                    component={RouterLink}
                    to={page.path}
                    sx={{ mr: 1, my: 2, color: 'white', display: 'block' }}
                >
                    {page.name}
                </Button>
            ))}
        </Box>
    );
};

export default DesktopNavigationLinks;
