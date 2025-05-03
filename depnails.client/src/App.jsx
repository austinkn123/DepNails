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

function App() {


    return (
        <ThemeProvider theme={theme}>
        <NavBar />
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/not-found' element={<NotFound />} />
                    <Route path='*' element={<Navigate to='/not-found' />} />
                </Routes>
                <ToastContainer />
            </Router>
        </ThemeProvider>
    );
    
}

export default App;