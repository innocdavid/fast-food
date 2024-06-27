import express, { Request, Response } from 'express';
import mongoose, { mongo } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import myUserRoute from './routes/MyUserRoute';
import myRestaurantRoute from './routes/MyRestaurantRoute';
import restaurantRoute from './routes/RestaurantRoute';
import orderRoute from './routes/OrderRoute';
import cors from 'cors';
import 'dotenv/config';

//db
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.log('conected to database');
    });


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//app
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/orders', orderRoute);

app.listen(8000, () => {
    console.log('server running on localhost:8000');
});