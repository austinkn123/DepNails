import { Button, Typography } from '@mui/material';
import {getAllAppointments } from '../../queries/Home';


const Home = () => {
    const { data: appointments, loading } = getAllAppointments(); 

    return (
        <div>
            <Typography variant="h3" component="h2">
                Welcome
            </Typography>
            {appointments && (
                <pre>{JSON.stringify(appointments, null, 2)}</pre>
            )}
            <Button variant="contained">Click Me</Button>
        </div>
    );
}

export default Home;