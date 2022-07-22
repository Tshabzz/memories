
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import memories from './images/memories.png'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import { theme } from './styles'


function App() {

  return (
    <ThemeProvider theme={theme}>
      <Container maxidth="lg">
        <AppBar sx={theme.appBar} position="static" color="inherit">
          <Typography variant="h2" align="center" >
            Memories
          </Typography>
          <img style={theme.image} src={memories} alt="memories" height="60" />
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </ThemeProvider>
  );
}


export default App;
