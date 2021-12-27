import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Avatar, Divider, TableContainer, Table, TableBody, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import { getCrypto } from "../services/getCrypto";
import Crypto from "../components/Crypto";
import { capitalizeString } from "../utils/utils";
import MoreInfoItem from "../components/Crypto/MoreInfoItem";
import CryptoLinkItem from "../components/Crypto/CryptoLinkItem";
import CryptoCategories from "../components/Crypto/CryptoCategories";
import CryptoPriceChange from "../components/Crypto/CryptoPriceChange";

const PageBody = styled("div")({
    margin: "6em 3em 0 3em",
    height: "80vh",
    overflowY: "auto",
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

const CryptoHeader = styled("div")({
    display: "flex",
    alignItems: "center",
    marginBottom: "0.7em",
});

const CryptoName = styled("h1")({
    margin: 0,
});

const CryptoAvatar = styled(Avatar)({
    marginRight: "1em",
});

const CryptoPriceSection = styled("div")({
    display: "flex",
    alignItems: "center"
});

const CryptoPrice = styled("h2")({
    margin: "0 1em 0 0",
    "&::before": {
        content: "'$'",
    },
    fontWeight: "500",
})

const SectionDivider = styled(Divider)({
    margin: "1em 0 1em",
});

const CryptoDescription = styled("div")({});

const MoreInfo = styled("div")({
    marginBottom: "2em",
});

const CryptoLinks = styled("div")({
    marginBottom: "2em",
});

const CryptoPage = () => {
    const { id } = useParams();
    const [crypto, setCrypto] = useState(null);

    useEffect(() => {
        getCrypto(id)
            .then((data) => {
                if ("_source" in data) {
                    setCrypto(
                        new Crypto({
                            id: data._source.id,
                            all_time_high: data._source["all_time_high(usd)"],
                            all_time_high_date: data._source["all_time_high_date"],
                            block_time_in_minutes: data._source["block_time_in_minutes"],
                            blockchain_site: data._source["blockchain_site"],
                            categories: data._source["categories"],
                            community_score: data._source["community_score"],
                            current_price: data._source["current_price"],
                            description: data._source["description"],
                            developer_score: data._source["developer_score"],
                            genesis_date: data._source["genesis_date"],
                            github: data._source["github"],
                            hashing_algorithm: data._source["hashing_algorithm"],
                            homepage_link: data._source["homepage_link"],
                            image_url: data._source["image_url"],
                            liquidity_score: data._source["liquidity_score"],
                            market_cap: data._source["market_cap"],
                            news: data._source["news"],
                            price_change_percentage_1y: data._source["price_change_percentage_1y"],
                            price_change_percentage_7d: data._source["price_change_percentage_7d"],
                            price_change_percentage_30d: data._source["price_change_percentage_30d"],
                            subreddit_url: data._source[""],
                        })
                    );
                } else {
                    console.error("Invalid crypto data format");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    if (crypto == null) {
        return (
            <Loading>
                <LoadingChild>
                    <CircularProgress />
                    <h1>Loading...</h1>
                </LoadingChild>
            </Loading>
        );
    }

    return (
        <PageBody>
            <CryptoHeader>
                <CryptoAvatar src={crypto.image_url} />
                <CryptoName>{capitalizeString(crypto.id)}</CryptoName>
            </CryptoHeader>
            <CryptoPriceSection>
                <CryptoPrice>{crypto.current_price}</CryptoPrice>
                <Stack direction="row" spacing={2} >
                    <CryptoPriceChange timeFrame="7d" percentage={crypto.price_change_percentage_7d}/>
                    <CryptoPriceChange timeFrame="30d" percentage={crypto.price_change_percentage_30d}/>
                    <CryptoPriceChange timeFrame="1y" percentage={crypto.price_change_percentage_1y}/>
                </Stack>
            </CryptoPriceSection>
            <CryptoCategories categories={crypto.categories} />
            <SectionDivider />
            <CryptoDescription>
                <h3>Description</h3>
                {crypto.description}
            </CryptoDescription>
            <SectionDivider />
            <MoreInfo>
                <h3>More Info</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableBody>
                            <MoreInfoItem title="All Time High" content={crypto.all_time_high} />
                            <MoreInfoItem title="All Time High Date" content={crypto.all_time_high_date} />
                            <MoreInfoItem
                                title="Block Time (Minutes)"
                                content={crypto.block_time_in_minutes}
                            />
                            <MoreInfoItem title="Community Score" content={crypto.community_score} />
                            <MoreInfoItem title="Developer Score" content={crypto.developer_score} />
                            <MoreInfoItem title="Genesis Date" content={crypto.genesis_date} />
                            <MoreInfoItem title="Hashing Algorithm" content={crypto.hashing_algorithm} />
                            <MoreInfoItem title="Liquidity Score" content={crypto.liquidity_score} />
                            <MoreInfoItem title="Market Capitalization" content={crypto.market_cap} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </MoreInfo>
            <SectionDivider />
            <CryptoLinks>
                <h3>Useful Links</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableBody>
                            <CryptoLinkItem title="Blockchain Site" content={crypto.blockchain_site} />
                            <CryptoLinkItem title="GitHub" content={crypto.github} />
                            <CryptoLinkItem title="Homepage" content={crypto.homepage_link} />
                            <CryptoLinkItem title="Subreddit" content={crypto.subreddit_url} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </CryptoLinks>
        </PageBody>
    );
};

export default CryptoPage;
