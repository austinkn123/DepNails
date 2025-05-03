import { createTheme } from '@mui/material/styles';

// #1A1C1B
// #B33564
// #D10058
// #EF94BD
// #ECDFBC
// #E3E5D9


let theme = createTheme({
    palette: {
        primary: {
            main: '#B33564',
        },
        secondary: {
            main: '#EF94BD',
        },
        background: {
            default: '#ECDFBC',
        },
        text: {
            primary: '#D10058',
            secondary: '#1A1C1B',
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        components: {
            MuiTypography: {
                defaultProps: {
                    variantMapping: {
                        h1: 'h2',
                        h2: 'h2',
                        h3: 'h2',
                        h4: 'h2',
                        h5: 'h2',
                        h6: 'h2',
                        subtitle1: 'h2',
                        subtitle2: 'h2',
                        body1: 'span',
                        body2: 'span',
                    },
                },
            },
        },
    },
});

export { theme };