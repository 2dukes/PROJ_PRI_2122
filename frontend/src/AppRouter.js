import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/Layout/PageLayout";
import CryptoPage from "./pages/CryptoPage";
import NewsPage from "./pages/NewsPage";
import HomePage from "./pages/HomePage";

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
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    key="/"
                    element={
                        <PageLayout key="/">
                            <HomePage />
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
