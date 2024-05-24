import express, { Request, Response } from 'express';
import mongoose, { mongo } from 'mongoose';
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

app.get('/test', async (req: Request, res: Response) => {
    res.json({ message: 'Hello from the server' });
});

app.listen(8000, () => {
    console.log('server running on localhost:8000');
});