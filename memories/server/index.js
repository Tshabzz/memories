import express, {urlencoded, json} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/index.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongodb_url = process.env.MONGODB_URL;

app.use(json({limit: '30mb', extended: true}))
app.use(urlencoded({limit: '30mb', extended: true}))
app.use(cors())

mongoose.connect(mongodb_url)
.then(()=>{
    app.listen(port, ()=> console.log(`Listening on ${port}`))
})
.catch(err => console.log(err.message));


app.use('/api', routes);