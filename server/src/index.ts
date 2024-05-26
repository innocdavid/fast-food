import express, { Request, Response } from 'express';
import mongoose, { mongo } from 'mongoose';
import myUserRoute from './routes/MyUserRoute'
import cors from 'cors';
import 'dotenv/config';

//db
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.log('conected to database');
    });

//app
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/my/user', myUserRoute)

app.listen(8000, () => {
    console.log('server running on localhost:8000');
});