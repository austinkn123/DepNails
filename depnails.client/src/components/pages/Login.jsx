import { Box, Container } from '@mui/material';
import LoginHeader from '../molecules/login/LoginHeader'; // New import
import LoginForm from '../organisms/login/LoginForm'; // New import
import SignUpRedirect from '../molecules/login/SignUpRedirect'; // New import

const Login = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative', 
            }}>
                <LoginHeader /> 
                <LoginForm />
                <SignUpRedirect />
            </Box> 
        </Container>
    );
}

export default Login;