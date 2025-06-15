import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../../queries/Auth';
import Logo from '../molecules/navbar/Logo'; // Added import
import MobileNavigationMenu from '../molecules/navbar/MobileNavigationMenu'; // Added import
import DesktopNavigationLinks from '../molecules/navbar/DesktopNavigationLinks'; // Added import
import UserSettingsMenu from '../molecules/navbar/UserSettingsMenu'; // Added import

const pages = [
    { name: 'Home', path: '/' }, // Corrected Home path
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
    const { isAuthenticated, logout, accessToken } = useAuth();
    const navigate = useNavigate();

    const apiLogoutMutation = logoutUser(
        () => { // onSuccess
            logout();
            navigate('/');
        },
        (error) => { // onError
            console.error('Logout failed:', error);
            // Fallback: local logout and redirect if API call fails
            logout();
            navigate('/login');
        }
    );

    const handleUserMenuAction = (actionOrPath) => {
        if (actionOrPath === 'logout') {
            if (accessToken) {
                apiLogoutMutation.mutateAsync({ accessToken });
            }
            else {
                logout();
                navigate('/login');
            }
        } else if (actionOrPath === 'profile') {
            navigate('/profile');
        } else {
            navigate(actionOrPath);
        }
    };

    const currentSettings = isAuthenticated ? loggedInSettings : loggedOutSettings;

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo - Desktop */}
                    <Logo sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />

                    {/* Mobile Navigation Menu */}
                    <MobileNavigationMenu pages={pages} />

                    {/* Logo - Mobile */}
                    <Logo sx={{ display: { xs: 'flex', md: 'none' }, mr: 2, flexGrow: 1 }} />

                    {/* Desktop Navigation Links */}
                    <DesktopNavigationLinks pages={pages} />

                    {/* User Settings Menu */}
                    <UserSettingsMenu settings={currentSettings} onAction={handleUserMenuAction} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;