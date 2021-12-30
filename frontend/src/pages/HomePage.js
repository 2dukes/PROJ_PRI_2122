import React, { Fragment } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, InputBase, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import SearchFilters from "../components/HomePage/SearchFilters";
import SearchResults from "../components/HomePage/SearchResults";

const Search = styled(Paper)({
    width: "100%",
    position: "relative",
    border: "1px solid",
    borderColor: "rgb(118, 118, 118)",
    "&:hover": {
        border: "1px solid black",
    },
    top: "25%",
    float: "right",
    right: 0,
});

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

const PageHeader = styled("div")({
    margin: "6em 1em 0 1em",
    display: "flex",
    alignItems: "center",
});

const SearchResultsPage = () => {
    const searchResultsCryptos = [
        {
            id: 438,
            name: "bitcoin",
            image_url: "https://bitcoin.org/img/icons/opengraph.png?1637078881",
            description: "This is the bitcoin description",
        },
        {
            id: 992,
            name: "bitcoin",
            image_url: "https://bitcoin.org/img/icons/opengraph.png?1637078881",
            description: "This is the bitcoin description",
        },
        {
            id: 993,
            name: "bitcoin",
            image_url: "https://bitcoin.org/img/icons/opengraph.png?1637078881",
            description: "This is the bitcoin description",
        },
        {
            id: 994,
            name: "bitcoin",
            image_url: "https://bitcoin.org/img/icons/opengraph.png?1637078881",
            description: "This is the bitcoin description",
        },
    ];

    const articles = [
        {
            title: "Alibaba, Tencent rewrite history by scrubbing NFTs to appease Beijing",
            article:
                "Alibaba and Tencent recently launched support for NFTs, created NFT marketplaces, listed NFTs for sale, profiting from all of it.",
            url: "https://coinmarketcap.com/headlines/news/alibaba-tencent-tech-giants-scrub-nfts-to-appease-beijing/",
        },
        {
            title: "China Crypto Ban: World's largest Bitcoin mining pool to block IP access from mainland China",
            article:
                "The latest update in the Chinese crypto ban saw the world's largest Bitcoin mining pool, Ant Pool give in to the regulatory crackdown and announced blocking IP access in mainland China, effective from 15th October.",
            url: "https://coinmarketcap.com/headlines/news/china-crypto-ban-worlds-largest-bitcoin-mining-pool-to-block-ip-access-from-mainland-china/",
        },
        {
            title: "Binance.US promotes president to CEO in the wake of Brooks' departure",
            article:
                "Binance.US has promoted its president Brian Shroder to CEO after the sudden exit of Brian Brooks two months ago.",
            url: "https://coinmarketcap.com/headlines/news/binance-us-promotes-president-to-ceo-in-the-wake-of-brooks-departure/",
        },
        {
            title: "China Crypto Ban: Country's largest crypto exchange suspends majority services today",
            article:
                "The latest update in the Chinese crypto ban saw the largest crypto exchange platform, Huobi completely shut down futures, contracts, and other derivatives services for all Chinese users.",
            url: "https://coinmarketcap.com/headlines/news/china-crypto-ban-countrys-largest-crypto-exchange-suspends-majority-services-today/",
        },
        {
            title: "No, China isn't soliciting public opinion on whether to drop its bitcoin mining ban",
            article:
                "China published a draft proposal relating to crypto mining last week — but the government is not soliciting public opinions to unban crypto mining, despite reports from media outlets and info shared on social media.",
            url: "https://coinmarketcap.com/headlines/news/china-not-unban-bitcoin-mining/",
        },
        {
            title: "PODCAST: Yellen fears crypto, Kazakhstan restricts miners, Epic courts NFTs",
            article:
                "Listen to the most important stories in Bitcoin and crypto covered by our newsroom in the past week.",
            url: "https://coinmarketcap.com/headlines/news/yellen-fears-crypto-kazakhstan-restricts-miners-epic-courts-nfts/",
        },
        {
            title: "Epic Games Confirms Openness to Allow Blockchain Gaming",
            article: "Epic Games latches onto Steam's ban of blockchain games and warms up to the industry.",
            url: "https://www.bsc.news/post/epic-games-confirms-openness-to-allow-blockchain-gaming",
        },
        {
            title: "Fortnite's Epic Games loves NFTs now that Steam rejected them entirely",
            article:
                "Fortnite publisher Epic Games is totally open to NFTs now that Steam won't approve any games featuring blockchain-powered collectibles.",
            url: "https://coinmarketcap.com/headlines/news/epic-games-nft-loves-steam-rejected-them-entirely-but-not-fortnite/",
        },
    ];

    return (
        <Fragment>
            <PageHeader>
                <Grid container>
                    <Grid item sm={5} md={3}>
                        <Typography variant="h3" display="inline" width="50%">
                            Search Results
                        </Typography>
                    </Grid>
                    <Grid item sm={7} md={9}>
                        <Search elevation={0}>
                            <form>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
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
                    <SearchFilters />
                </Grid>
                <Grid item sm={7} md={9}>
                    <SearchResults
                        searchResultsCryptos={searchResultsCryptos}
                        searchResultsArticles={articles}
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default SearchResultsPage;
