import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
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
import { AuthProvider } from "./context/AuthContext"; // Removed useAuth as it's not directly used here anymore for NavBar logic
// Removed ProtectedRoute import as it's no longer used

// Removed ConditionalNavBar component

function App() {


    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AuthProvider> {/* Wrap with AuthProvider */}
                    <NavBar /> {/* NavBar is now always rendered */}
                    <Routes>
                        {/* Login and SignUp routes are removed as they are modals now */}
                        {/* <Route path='/login' element={<Login />} /> */}
                        {/* <Route path='/signup' element={<SignUp />} /> */}
                        <Route path='/not-found' element={<NotFound />} />
                        <Route path='/' element={<Home />} />
                        <Route path='/appointment' element={<Appointment />} />
                        <Route path='/services' element={<Services />} />
                        <Route path='/contact-us' element={<ContactUs />} />
                        
                        {/* Fallback for unmatched routes */}
                        <Route path='*' element={<Navigate to='/not-found' />} />
                    </Routes>
                    <ToastContainer />
                </AuthProvider> {/* Close AuthProvider */}
            </Router>
        </ThemeProvider>
    );

}

export default App;