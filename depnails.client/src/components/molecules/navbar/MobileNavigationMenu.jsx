import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

const MobileNavigationMenu = ({ pages }) => {
    const [navMenuAnchor, setNavMenuAnchor] = useState(null);

    const handleOpenNavMenu = (event) => {
        setNavMenuAnchor(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setNavMenuAnchor(null);
    };

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar-mobile"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar-mobile"
                anchorEl={navMenuAnchor}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(navMenuAnchor)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                {pages.map((page) => (
                    <MenuItem
                        key={page.name}
                        component={RouterLink}
                        to={page.path}
                        onClick={handleCloseNavMenu}
                    >
                        <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default MobileNavigationMenu;
