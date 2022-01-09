import React, { Fragment, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, InputBase, Grid, Paper, IconButton, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

import { makeSearch } from "../services/makeSearch";
import SearchFilters from "../components/HomePage/SearchFilters";
import SearchResults from "../components/HomePage/SearchResults";

const Search = styled(Paper)(({ theme }) => ({
    width: "100%",
    position: "relative",
    border: "1px solid",
    borderColor: "rgb(118, 118, 118)",
    "&:hover": {
        border: "1px solid black",
    },
}));

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(2, 2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    padding: theme.spacing(1, 1, 1, 0),
    width: "90%",
    [theme.breakpoints.down("md")]: {
        width: "60%",
    },
}));

const PageHeader = styled("div")({
    margin: "2em 1em 0 1em",
    display: "flex",
    alignItems: "center",
});

const CenterGlass = styled("div")({
    textAlign: "center",
    marginBottom: "1em",
});

const Loading = styled("div")({
    position: "relative",
    height: "95vh",
    textAlign: "center",
});

const LoadingChild = styled("div")({
    position: "absolute",
    height: "25%",
    width: "25%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
});

const SearchResultsPage = () => {
    const [sortBy, setSortBy] = useState("sortByScoreDesc");
    const [results, setResults] = useState({ showCryptos: true, showNews: true });
    const [blockTime, setBlockTime] = useState("");
    const [scores, setScores] = useState([
        [0, 105],
        [0, 105],
        [0, 105],
    ]);
    const [scoreLabelValues, setScoreLabels] = useState([1]);
    const [numScoreClicks, setNumScoreClicks] = useState(1);
    const [priceValues, setPriceValues] = useState(["", "", ""]);
    const [priceChangeLabelValues, setPriceChangeLabelValues] = useState([1]);
    const [numPriceChangeClicks, setPriceChangeClicks] = useState(1);
    const [allTimeHigh, setAllTimeHigh] = useState("");
    const [currentPrice, setCurrentPrice] = useState("");
    const [marketCap, setMarketCap] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [hashingAlgorithms, setHashingAlgorithms] = useState([]);
    const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchResultsCryptos, setSearchResultsCryptos] = useState([]);
    const [searchResultsNews, setSearchResultsNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const processCryptosSearchResults = ({ response }) => {
        const cryptoRawResults = response.cryptos.hits.hits;
        const cryptoResults = [];

        cryptoRawResults.forEach((rawResult) => {
            cryptoResults.push({
                id: rawResult["_id"],
                name: rawResult["_source"]["id"],
                image_url: rawResult["_source"]["image_url"],
                description: rawResult["_source"]["description"],
            });
        });

        setSearchResultsCryptos(cryptoResults);
    };

    const processNewsSearchResults = ({ response }) => {
        const newsRawResults = response.news.hits.hits;
        const newsResults = [];

        for (let i = 0; i < newsRawResults.length; i++) {
            for (let j = 0; j < newsRawResults[i].inner_hits.news.hits.hits.length; j++) {
                newsResults.push({
                    title: newsRawResults[i].inner_hits.news.hits.hits[j]._source.title,
                    article: newsRawResults[i].inner_hits.news.hits.hits[j]._source.article,
                    url: newsRawResults[i].inner_hits.news.hits.hits[j]._source.url,
                });
            }
        }

        setSearchResultsNews(newsResults);
    };

    const searchSubmit = (event) => {
        event.preventDefault();

        let params = {
            sortBy,
            searchInput,
            results,
            blockTime,
            scores,
            scoreLabelValues,
            numScoreClicks,
            priceValues,
            priceChangeLabelValues,
            numPriceChangeClicks,
            allTimeHigh,
            currentPrice,
            marketCap,
            selectedCategories,
            selectedAlgorithms,
        };

        if (results.showCryptos && results.showNews) {
            setIsLoading(true);
            Promise.all([
                makeSearch({ ...params, results: { showCryptos: false, showNews: true } }),
                makeSearch({ ...params, results: { showCryptos: true, showNews: false } }),
            ]).then((values) => {
                let response = { news: values[0], cryptos: values[1] };

                processCryptosSearchResults({ response });
                processNewsSearchResults({ response });
                setIsLoading(false);
            });
        } else if (results.showCryptos && !results.showNews) {
            setIsLoading(true);
            makeSearch(params).then((values) => {
                let response = { cryptos: values };
                processCryptosSearchResults({ response });
                setIsLoading(false);
            });
        } else {
            setIsLoading(true);
            makeSearch(params).then((values) => {
                let response = { news: values };
                processNewsSearchResults({ response });
                setIsLoading(false);
            });
        }
    };

    return (
        <Fragment>
            <PageHeader>
                <Grid container sx={{ alignItems: "center" }}>
                    <Grid item sm={5} md={3} textAlign="center">
                        <Typography variant="h3" display="inline" sx={{ marginTop: "1em" }}>
                            Crypto Search
                        </Typography>
                    </Grid>
                    <Grid item sm={7} md={9}>
                        <Search elevation={0}>
                            <form id="search-form" onSubmit={searchSubmit}>
                                <SearchIconWrapper variant="outlined" type="submit">
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    value={searchInput}
                                    onChange={(event) => setSearchInput(event.target.value)}
                                    placeholder="Search…"
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </form>
                        </Search>
                    </Grid>
                </Grid>
            </PageHeader>
            <Grid container sx={{ marginTop: "2em" }}>
                <Grid item sm={5} md={3}>
                    <SearchFilters
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        results={results}
                        setResults={setResults}
                        blockTime={blockTime}
                        setBlockTime={setBlockTime}
                        scores={scores}
                        setScores={setScores}
                        scoreLabelValues={scoreLabelValues}
                        setScoreLabels={setScoreLabels}
                        numScoreClicks={numScoreClicks}
                        setNumScoreClicks={setNumScoreClicks}
                        priceValues={priceValues}
                        setPriceValues={setPriceValues}
                        priceChangeLabelValues={priceChangeLabelValues}
                        setPriceChangeLabelValues={setPriceChangeLabelValues}
                        numPriceChangeClicks={numPriceChangeClicks}
                        setPriceChangeClicks={setPriceChangeClicks}
                        allTimeHigh={allTimeHigh}
                        setAllTimeHigh={setAllTimeHigh}
                        currentPrice={currentPrice}
                        setCurrentPrice={setCurrentPrice}
                        marketCap={marketCap}
                        setMarketCap={setMarketCap}
                        categories={categories}
                        setCategories={setCategories}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        hashingAlgorithms={hashingAlgorithms}
                        setHashingAlgorithms={setHashingAlgorithms}
                        selectedAlgorithms={selectedAlgorithms}
                        setSelectedAlgorithms={setSelectedAlgorithms}
                    />
                    <CenterGlass>
                        <IconButton form="search-form" type="submit">
                            <SearchIcon sx={{ fontSize: "70px" }} />
                        </IconButton>
                    </CenterGlass>
                </Grid>
                <Grid item sm={7} md={9}>
                    {isLoading ? (
                        <Loading>
                            <LoadingChild>
                                <CircularProgress />
                                <h1>Loading...</h1>
                            </LoadingChild>
                        </Loading>
                    ) : (
                        <SearchResults
                            searchResultsCryptos={searchResultsCryptos}
                            searchResultsArticles={searchResultsNews}
                            showResultsOptions={results}
                        />
                    )}
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default SearchResultsPage;
