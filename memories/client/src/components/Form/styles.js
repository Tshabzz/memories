import { createTheme } from '@mui/material/styles'


export const theme = createTheme(({
    root: {
        margin: '4px'
    },
    paper: {
        padding: '10px',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '4px'
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: '10px',
    }
}));
