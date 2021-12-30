import React, { Fragment, useState } from "react";
import { Pagination, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import SearchResultsItem from "./SearchResultsItem";

const SearchResultsCryptos = ({ cryptos }) => {
    const [currentPage, setPage] = useState(1);
    const resultsPerPage = 3;
    const numberPages = Math.ceil(cryptos.length / resultsPerPage);
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const selectedResults = cryptos.slice(indexOfFirstResult, indexOfLastResult);
    if (!cryptos || cryptos?.length === 0) return null;

    return (
        <Fragment>
            <Typography gutterBottom variant="h4">
                Cryptocurrencies
            </Typography>
            <Stack>
                {selectedResults.map((searchResultsCrypto) => (
                    <SearchResultsItem
                        key={searchResultsCrypto.id}
                        searchResultsCrypto={searchResultsCrypto}
                    />
                ))}
            </Stack>
            <Stack spacing={2} alignItems="center" margin="2em">
                <Pagination
                    count={numberPages}
                    page={currentPage}
                    onChange={(_, newPage) => setPage(newPage)}
                />
            </Stack>
        </Fragment>
    );
};

export default SearchResultsCryptos;
