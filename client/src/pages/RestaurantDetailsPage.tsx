import { useGetRestaurantDetails } from "@/api/RestaurantApi";
import RestaurantDetailsInfo from "@/components/RestaurantDetailsInfo";
import RestaurantDetailsMenuItem from "@/components/RestaurantDetailsMenuItem";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurantDetails(restaurantId);

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
                        <RestaurantDetailsMenuItem menuItem={menuItem} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetailsPage;