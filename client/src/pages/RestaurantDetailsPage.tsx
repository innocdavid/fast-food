import { useGetRestaurantDetails } from "@/api/RestaurantApi";
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
        </div>
    );
};

export default RestaurantDetailsPage;