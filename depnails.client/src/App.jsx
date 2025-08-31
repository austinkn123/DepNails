import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useLocation 
} from "react-router-dom";
import { theme } from "../layout/Theme";
import { ThemeProvider } from '@mui/material/styles';
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import NavBar from "./components/organisms/NavBar";
import Appointment from "./components/pages/Appointment";
import Services from "./components/pages/Services";
import ContactUs from "./components/pages/ContactUs";
import Login from "./components/pages/Login"; 
import SignUp from "./components/pages/SignUp"; 
import Profile from "./components/pages/Profile";
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 


function AppContent() { // Create a new component to use useLocation
    const location = useLocation();
    const showNavBar = !['/login', '/signup'].includes(location.pathname); 

    return (
        <>
            {showNavBar && <NavBar />}
             
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/not-found' element={<NotFound />} />
                <Route path='/appointment' element={<Appointment />} />
                <Route path='/services' element={<Services />} />
                <Route path='/contact-us' element={<ContactUs />} />
                <Route path='*' element={<Navigate to='/not-found' />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Router>
                    <AppContent /> {/* Render AppContent which contains conditional NavBar and Routes */}
                </Router>
                <ToastContainer />
            </ThemeProvider>
        </>
    );
}

export default App;