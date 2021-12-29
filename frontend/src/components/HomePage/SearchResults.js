import React, { useState } from "react";
import { Stack, Pagination, Typography } from "@mui/material";

import SearchResultsItem from "./SearchResultsItem";
import NewsPage from "../../pages/NewsPage";

const SearchResults = ({ searchResultsCryptos, searchResultsArticles }) => {
    const [currentPage, setPage] = useState(1);
    const resultsPerPage = 3;
    const numberPages = Math.ceil(searchResultsCryptos.length / resultsPerPage);
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const selectedResults = searchResultsCryptos.slice(indexOfFirstResult, indexOfLastResult);

    return (
        <div>
            <Typography gutterBottom variant="h4">
                Cryptocurrencies
            </Typography>
            <Stack>
                {selectedResults.map((searchResultsCrypto) => (
                    <SearchResultsItem searchResultsCrypto={searchResultsCrypto} />
                ))}
            </Stack>
            <Stack spacing={2} alignItems="center" margin="2em">
                <Pagination
                    count={numberPages}
                    page={currentPage}
                    onChange={(_, newPage) => setPage(newPage)}
                />
            </Stack>
            <Typography gutterBottom variant="h4">
                News
            </Typography>
            <NewsPage articles={searchResultsArticles} />
        </div>
    );
};

export default SearchResults;
