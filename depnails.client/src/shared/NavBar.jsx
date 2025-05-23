import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

// Defines the navigation links for the header
const pages = [
    { name: 'Home', path: '' },
    { name: 'Book', path: '/appointment' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact-us' },
];
// Defines the user account settings options
const settings = [
    { name: 'Log out', path: '/login' },
];

function NavBar() {
    // State for controlling the mobile navigation menu's anchor element
    const [navMenuAnchor, setNavMenuAnchor] = useState(null);
    // State for controlling the user settings menu's anchor element
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo/Brand Name - Visible on medium screens and up */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' }, // Hidden on extra-small/small, visible on medium and up
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Dep Nails
                    </Typography>

                    {/* Mobile Navigation Menu Section - Visible on extra-small and small screens */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> {/* Visible on xs/sm, hidden on md and up */}
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e) => setNavMenuAnchor(e.currentTarget)} // Opens the mobile navigation menu
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
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
                            open={Boolean(navMenuAnchor)} // Controls visibility of the menu
                            onClose={() => setNavMenuAnchor(null)} // Closes the menu
                            sx={{ display: { xs: 'block', md: 'none' } }} // Display logic for mobile menu
                        >
                            {/* Maps over the 'pages' array to create menu items for mobile */}
                            {pages.map((page, index) => (
                                <MenuItem
                                    key={`${page}-${index}`}
                                    component={Link}
                                    to={`${page.path}`}
                                    onClick={() => setNavMenuAnchor(null)} // Closes menu on item click
                                >
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* Mobile Logo/Brand Name - Visible on extra-small and small screens, fills available space */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' }, // Visible on xs/sm, hidden on md and up
                            flexGrow: 1, // Allows the element to grow and fill available space
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Dep Nails
                    </Typography>
                    {/* Desktop Navigation Links Section - Visible on medium screens and up */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}> {/* Hidden on xs/sm, visible on md and up */}
                        {/* Maps over the 'pages' array to create navigation buttons for desktop */}
                        {pages.map((page, index) => (
                            <Button
                                key={`${page}-${index}`}
                                component={Link}
                                to={`${page.path}`}
                                onClick={() => setNavMenuAnchor(null)} // Though navMenuAnchor is for mobile, this ensures consistency if reused
                                sx={{ mr: 1, my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    {/* User Settings Menu Section */}
                    <Box sx={{ flexGrow: 0 }}> {/* Prevents this box from growing */}
                        <Tooltip title="Log Out">
                            <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)} sx={{ p: 0 }}> {/* Opens user settings menu */}
                                <AccountCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={userMenuAnchor}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(userMenuAnchor)} // Controls visibility of the user menu
                            onClose={() => setUserMenuAnchor(null)} // Closes the user menu
                        >
                            {/* Maps over the 'settings' array to create user menu items */}
                            {settings.map((setting, index) => (
                                <MenuItem
                                    key={`${setting}-${index}`}
                                    onClick={() => {
                                        setUserMenuAnchor(null); // Closes menu on item click
                                        if (setting.name === 'Log out') {
                                            sessionStorage.clear(); // Clears session storage on logout
                                            logout(); // Calls the logout function (ensure this is defined elsewhere)
                                        }
                                    }}
                                    component={Link}
                                    to={`${setting.path}`}
                                >
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;