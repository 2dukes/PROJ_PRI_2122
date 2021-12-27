import React from "react";

import SearchResultsItem from "./SearchResultsItem";

const SearchResults = ({ searchResultsCryptos }) => {
    return (
        <div>
            {searchResultsCryptos.map((searchResultsCrypto) => (
                <SearchResultsItem searchResultsCrypto={searchResultsCrypto} />
            ))}
        </div>
    );
};

export default SearchResults;
