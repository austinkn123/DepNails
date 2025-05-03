import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { theme } from "../layout/Theme";
import { ThemeProvider } from '@mui/material/styles';
import NavBar from "../layout/NavBar";
import Appointment from "./pages/Appointment";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";

function App() {


    return (
        <ThemeProvider theme={theme}>
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/appointment' element={<Appointment />} />
                    <Route path='/services' element={<Services />} />
                    <Route path='/contact-us' element={<ContactUs />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/not-found' element={<NotFound />} />
                    <Route path='*' element={<Navigate to='/not-found' />} />
                </Routes>
                <ToastContainer />
            </Router>
        </ThemeProvider>
    );

}

export default App;