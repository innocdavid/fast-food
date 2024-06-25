import { useSearchRestaurant } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
};

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch",
    });

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { results, isLoading } = useSearchRestaurant(searchState, city);

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }));
    };

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }))
    };

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1,
        }))
    }

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }));
    };

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            setSearchQuery: "",
            page: 1,
        }));
    };

    if (isLoading) return <span>Loading....</span>

    if (!results?.data || !city) return <span>No results found</span>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter 
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prevExpanded) => !prevExpanded)}
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar 
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery} 
                    placeHolder="Search by cuisine or restauant name"
                    onReset={resetSearch}
                />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultsInfo 
                        totalCount={results.pagination.totalCount} 
                        city={city} 
                    />
                    <SortOptionDropdown
                        sortOption={searchState.sortOption}
                        onChange={(value) => setSortOption(value)} 
                    />
                </div>

                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant}/>
                ))}

                {results.data.length > 0 && (
                     <PaginationSelector 
                        page={results.pagination.page}
                        pages={results.pagination.pages}
                        onPageChange={setPage}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchPage;