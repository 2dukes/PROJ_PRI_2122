import React, { useState } from "react";
import { Stack, Pagination, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import SearchResultsCryptos from "./SearchResultsCryptos";
import SearchResultsNews from "./SearchResultsNews";

const DefaultInfo = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
});

const SearchResults = ({ searchResultsCryptos, searchResultsArticles }) => {
    const showCryptos = searchResultsCryptos != null && searchResultsCryptos?.length > 0;
    const showNews = searchResultsArticles != null && searchResultsArticles?.length > 0;

    if (!showCryptos && !showNews) {
        return (
            <DefaultInfo>
                <Typography variant="h5">
                    Please use the search bar or the filters to search for cryptos or news
                </Typography>
            </DefaultInfo>
        );
    }

    return (
        <div>
            {showCryptos && <SearchResultsCryptos cryptos={searchResultsCryptos} />}
            {showNews && <SearchResultsNews articles={searchResultsArticles} />}
        </div>
    );
};

export default SearchResults;
