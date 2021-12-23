import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/Layout/PageLayout";
import CryptoPage from "./pages/CryptoPage";
import NewsPage from "./pages/NewsPage";
import SearchResultsPage from "./pages/SearchResultsPage";

const AppRouter = () => {
    const exampleArticles = [
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
    ];

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    key="/"
                    element={
                        <PageLayout key="/">
                            <SearchResultsPage />
                        </PageLayout>
                    }
                />

                <Route
                    exact
                    path="/crypto/:id"
                    key="/crypto/:id"
                    element={
                        <PageLayout key="/crypto/:id">
                            <CryptoPage />
                        </PageLayout>
                    }
                />

                <Route
                    exact
                    path="/news/"
                    key="/news/"
                    element={
                        <PageLayout key="/news/">
                            <NewsPage articles={exampleArticles} />
                        </PageLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
