import { useParams } from "react-router-dom";

const SearchPage = () => {
    const { city } = useParams();
    return (
        <>
            <h1>User searched for {city}</h1>
        </>
    );
};

export default SearchPage;