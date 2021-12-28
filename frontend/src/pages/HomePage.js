import React from "react";
import { Link } from "react-router-dom";

import SearchResults from "../components/HomePage/SearchResults";

const SearchResultsPage = () => {
    const searchResultsCryptos = [
        {
            id: 990,
            name: "bitcoin",
            image_url: "https://bitcoin.org/img/icons/opengraph.png?1637078881",
            description: "This is the bitcoin description",
        },
        {
            id: 990,
            name: "bitcoin",
            image_url: "https://bitcoin.org/img/icons/opengraph.png?1637078881",
            description: "This is the bitcoin description",
        },
        {
            id: 990,
            name: "bitcoin",
            image_url: "https://bitcoin.org/img/icons/opengraph.png?1637078881",
            description: "This is the bitcoin description",
        },
        {
            id: 990,
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
    ];

    return (
        <div>
            <h1>Search Results</h1>
            <p>Search Results Page</p>
            <Link to="/crypto/438">Crypto 438</Link>
            <br />
            <Link to="/news/">Example Article</Link>
            <SearchResults searchResultsCryptos={searchResultsCryptos} searchResultsArticles={articles} />
        </div>
    );
};

export default SearchResultsPage;
