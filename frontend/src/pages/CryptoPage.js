import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCrypto } from "../services/getCrypto";
import Crypto from "../components/Crypto";

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
                            all_time_high: data._source["all_time_hight(usd)"],
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

    console.log(crypto);

    return (
        <div>
            <h1>Cryptocurrency Information</h1>
            <h1>{crypto?.id}</h1>
        </div>
    );
};

export default CryptoPage;
