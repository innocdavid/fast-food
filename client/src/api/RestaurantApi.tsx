import { SearchState } from "@/pages/SearchPage";
import { SearchRestaurantResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (searchState: SearchState, city?: string) => {
    const createSearchRequest = async (): Promise<SearchRestaurantResponse> => {
        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);

        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`);

        if (!response.ok) throw new Error("Faild to get restaurant");

        return response.json();
    };

    const { data: results, isLoading} = useQuery(
        ["searchRestaurant", searchState], 
        createSearchRequest,
        { enabled: !!city });

    return { results, isLoading };
}