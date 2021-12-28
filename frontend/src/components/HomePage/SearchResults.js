import React, { useState } from "react";
import { Stack, Pagination } from "@mui/material";

import SearchResultsItem from "./SearchResultsItem";

const SearchResults = ({ searchResultsCryptos }) => {
    const [currentPage, setPage] = useState(1);
    const resultsPerPage = 3;
    const numberPages = Math.ceil(searchResultsCryptos.length / resultsPerPage);
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const selectedResults = searchResultsCryptos.slice(indexOfFirstResult, indexOfLastResult);

    return (
        <div>
            <div>
                {selectedResults.map((searchResultsCrypto) => (
                    <SearchResultsItem searchResultsCrypto={searchResultsCrypto} />
                ))}
            </div>
            <Stack spacing={2} alignItems="center" marginTop="2em">
                <Pagination
                    count={numberPages}
                    page={currentPage}
                    onChange={(_, newPage) => setPage(newPage)}
                />
            </Stack>
        </div>
    );
};

export default SearchResults;
