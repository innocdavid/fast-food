import express from 'express';
import multer from 'multer';
import MyRestaurantController from '../controllers/MyRestaurantController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateRestaurantRequest } from '../middleware/validation';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
});

router.get(
    '/', 
    jwtCheck,
    jwtParse,
    MyRestaurantController.getMyRestaurant
);

router.patch(
    '/orders/:orderI/status',
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateOrderStatus
)

router.get(
    '/orders',
    jwtCheck,
    jwtParse,
    MyRestaurantController.getMyRestaurantOrders
)

router.post(
    '/', 
    upload.single('imageFile'),
    validateRestaurantRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantController.createMyRestaurant
);

router.put(
    '/', 
    upload.single('imageFile'),
    validateRestaurantRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateMyRestaurant
);

export default router;