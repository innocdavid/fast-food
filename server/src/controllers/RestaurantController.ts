import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const getRestaurant = async (req: Request, res: Response) => {
    try {
        const { restaurantId } = req.params;

        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        res.status(200).json(restaurant);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const searchRestaurant = async (req: Request, res: Response) => {
    try {
        const city = req.params.city;

        const searchQuery = (req.query.searchQuery as string) || "";
        const selectedCuisines = (req.query.selectedCuisines as string) || "";
        const sortOption = (req.query.sortOption as string) || "lastUpdated";
        const page = parseInt(req.query.page as string) || 1;

        let query: any = {};

        query["city"] = new RegExp(city, "i");
        const cityCheck = await Restaurant.countDocuments(query);

        if (cityCheck === 0) {
            return res.status(404)
                .json({
                    data: [],
                    pagination: {
                        totalCount: 0,
                        page: 1,
                        pages:1,
                    },
                });
        }

        if (selectedCuisines) {
            const cuisinesArray = selectedCuisines
                .split(",")
                .map((cuisine) => new RegExp(cuisine, "i"));

                query["cuisines"] = { $all: cuisinesArray };
        }

        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i");
            query["$or"] = [
                { restaurantName: searchRegex },
                { cuisines: { $in: [searchRegex] } },
            ];
        }

        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const restaurant = await Restaurant.find(query)
            .sort({ [sortOption]: 1 })
            .skip(skip)
            .limit(pageSize)
            .lean();
        
        const totalCount = await Restaurant.countDocuments(query);

        const response = {
            data: restaurant,
            pagination: {
                totalCount,
                page,
                pages: Math.ceil(totalCount / pageSize),
            },
        };

        res.status(200).send(response);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Somthing went wrong" });
    }
};

export default {
    getRestaurant,
    searchRestaurant,
}