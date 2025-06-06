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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../../queries/Auth'; // Added import

const pages = [
    { name: 'Home', path: '' },
    { name: 'Book', path: '/appointment' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact-us' },
];

const loggedInSettings = [
    { name: 'Profile', action: 'profile' }, 
    { name: 'Log out', action: 'logout' },
];

const loggedOutSettings = [
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
];

function NavBar() {
    const { isAuthenticated, logout, accessToken } = useAuth(); // Added accessToken
    const navigate = useNavigate();
    const [navMenuAnchor, setNavMenuAnchor] = useState(null);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);

    const apiLogoutMutation = logoutUser(); // Instantiate the mutation

    const handleUserMenuAction = (actionOrPath) => {
        setUserMenuAnchor(null);
        if (actionOrPath === 'logout') {
            console.log(accessToken)
            if (accessToken) {
                apiLogoutMutation.mutate(
                    { accessToken: accessToken }, // Data for the mutation
                    {
                        onSuccess: () => {
                            // The console.log from Auth.js's own onSuccess will also fire.
                            console.log('API logout successful from NavBar, proceeding with client-side cleanup.');
                            logout(); // from useAuth - clears local auth state
                            navigate('/'); // Redirect to home
                        },
                        onError: (error) => {
                            // The console.error from Auth.js's own onError will also fire.
                            console.error('API logout failed from NavBar:', error);
                            // Consider notifying the user or attempting a local logout anyway.
                            // For now, logging the error. If the session is invalid on the server,
                            // the user might encounter issues. A forced local logout could be an option:
                            // logout();
                            // navigate('/');
                        }
                    }
                );
            } else {
                console.error('Access token not available for logout. Performing local logout only.');
                logout(); // Fallback to local logout
                navigate('/');
            }
        } else if (actionOrPath === 'profile') {
            console.log("Profile action");
            // navigate('/profile');
        } else {
            navigate(actionOrPath);
        }
    };

    const currentSettings = isAuthenticated ? loggedInSettings : loggedOutSettings;

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo/Brand Name - Visible on medium screens and up */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
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
                        href="/"
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
                            id="menu-appbar-user"
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
                            open={Boolean(userMenuAnchor)}
                            onClose={() => setUserMenuAnchor(null)}
                        >
                            {currentSettings.map((setting) => (
                                <MenuItem key={setting.name} onClick={() => handleUserMenuAction(setting.action || setting.path)}>
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