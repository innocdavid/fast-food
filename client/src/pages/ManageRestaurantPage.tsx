import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { restaurant } = useGetMyRestaurant();
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

    const isEditingRestaurant = !!restaurant;

    return (
        <ManageRestaurantForm 
            restaurant={restaurant}
            onSave={isEditingRestaurant ? updateRestaurant : createRestaurant} 
            isLoading={isCreateLoading || isUpdateLoading } 
        />
    );
};

export default ManageRestaurantPage;