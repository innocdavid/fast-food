import { useGetRestaurantDetails } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import OrderSummary from "@/components/OrderSummary";
import RestaurantDetailsInfo from "@/components/RestaurantDetailsInfo";
import RestaurantDetailsMenuItem from "@/components/RestaurantDetailsMenuItem";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

const RestaurantDetailsPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurantDetails(restaurantId);

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const addToCart = (menuItem: MenuItem) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id);
            
            let updatedCartItems;

            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) => 
                    cartItem._id === menuItem._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    },
                ];
            }

            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
          const updatedCartItems = prevCartItems.filter(
            (item) => cartItem._id !== item._id
          );

          sessionStorage.setItem(
            `cartItems-${restaurantId}`,
            JSON.stringify(updatedCartItems)
          );

          return updatedCartItems;
        });
      };

    if (isLoading || !restaurant) return <span>Loading......</span>

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={restaurant.imageUrl}
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantDetailsInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <RestaurantDetailsMenuItem 
                            menuItem={menuItem} 
                            addToCart={() => addToCart(menuItem)} 
                        />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary 
                            restaurant={restaurant}
                            cartItems={cartItems} 
                            removeFromCart={removeFromCart}
                        />
                        <CardFooter>
                            <CheckoutButton />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetailsPage;