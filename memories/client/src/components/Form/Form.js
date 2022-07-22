import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { theme } from './styles'
import FileBase from 'react-file-base64'
import { ThemeProvider } from '@mui/material/styles'
import { TextField, Button, Typography, Paper } from '@mui/material'
import { createPost } from '../../actions/posts'

const Form = () => {
    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(postData))
    }
    const clear = () => {

    }
    const handleChange = (e) => {
        const name = e.target.name
        setPostData({ ...postData, [name]: e.target.value })
    }
    return (
        <ThemeProvider theme={theme}>
            <Paper sx={theme.paper}>
                <form autoComplete="off" noValidate style={theme.form} onSubmit={(e) => handleSubmit(e)} >
                    <Typography sx={theme.root} variant="h6">Creating a memory</Typography>
                    <TextField sx={theme.root} name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={e => handleChange(e)} />
                    <TextField sx={theme.root} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={e => handleChange(e)} />
                    <TextField sx={theme.root} name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={e => handleChange(e)} />
                    <TextField sx={theme.root} name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={e => handleChange(e)} />
                    <div sx={theme.root} style={theme.fileInput}>
                        <FileBase tyle="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                    </div>
                    <Button sx={{ ...theme.buttonSubmit, ...theme.root }} variant="container" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button sx={theme.root} variant="contained" color="secondary" size="small" onClick={() => clear()} fullWidth>Clear</Button>
                </form>
            </Paper>
        </ThemeProvider >
    );
}

export default Form;