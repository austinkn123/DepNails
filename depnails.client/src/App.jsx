import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useLocation // Import useLocation
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { theme } from "../layout/Theme";
import { ThemeProvider } from '@mui/material/styles';
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import NavBar from "./components/organisms/NavBar";
import Appointment from "./components/pages/Appointment";
import Services from "./components/pages/Services";
import ContactUs from "./components/pages/ContactUs";
import Login from "./components/pages/Login"; // Import Login page
import SignUp from "./components/pages/SignUp"; // Import SignUp page
import ConfirmEmail from "./components/pages/ConfirmEmail"; // Import ConfirmEmail page
import { AuthProvider } from "./context/AuthContext";


function AppContent() { // Create a new component to use useLocation
    const location = useLocation();
    const showNavBar = !['/login', '/signup', '/confirm-email'].includes(location.pathname); 

    return (
        <>
            {showNavBar && <NavBar />} 
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/confirm-email' element={<ConfirmEmail />} /> 
                <Route path='/not-found' element={<NotFound />} />
                <Route path='/appointment' element={<Appointment />} />
                <Route path='/services' element={<Services />} />
                <Route path='/contact-us' element={<ContactUs />} />
                
                {/* Fallback for unmatched routes */}
                <Route path='*' element={<Navigate to='/not-found' />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AuthProvider> {/* Wrap with AuthProvider */}
                    <AppContent /> {/* Render AppContent which contains conditional NavBar and Routes */}
                    <ToastContainer />
                </AuthProvider> {/* Close AuthProvider */}
            </Router>
        </ThemeProvider>
    );
}

export default App;