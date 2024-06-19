import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import Restaurant from '../models/restaurant';
import mongoose from 'mongoose';


const getMyRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.userId });

        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        res.status(201).json(restaurant);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId });

        if (existingRestaurant) {
            return res
                .status(409)
                .json({ message: 'User restaurant already exists' });
        }

        const imageUrl = await uploadImageFile(req.file as Express.Multer.File);
        
        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdate = new Date();
        
        await restaurant.save();

        res.status(201).send(restaurant)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
    try {
        const { 
            restaurantName, 
            city, 
            country, 
            deliveryPrice,
            estimatedDeliveryTime,
            cuisines,
            menuItems
        } = req.body;

        const restaurant = await Restaurant.findOne({ user: req.userId });

        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
        
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryPrice = deliveryPrice;
        restaurant.estimatedDeliveryTime = estimatedDeliveryTime;
        restaurant.cuisines = cuisines;
        restaurant.menuItems = menuItems;
        restaurant.lastUpdate = new Date();

        if (req.file) {
            const imageUrl = await uploadImageFile(req.file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }

        await restaurant.save()

        res.status(201).send(restaurant);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const uploadImageFile = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image =  Buffer.from(image.buffer).toString('base64');
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    return uploadResponse.url;
}

export default {
    getMyRestaurant,
    createMyRestaurant,
    updateMyRestaurant,
};