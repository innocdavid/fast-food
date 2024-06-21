import { useSearchRestaurant } from "@/api/RestaurantApi";
import SearchResultCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
    const { city } = useParams();
    const { results, isLoading } = useSearchRestaurant(city);

    if (isLoading) return <span>Loading....</span>

    if (!results?.data || !city) return <span>No results found</span>
    console.log(results)
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">insert cuisines here :)</div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchResultsInfo totalCount={results.pagination.totalCount} city={city} />
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant}/>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;