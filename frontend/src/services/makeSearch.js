import API_HOSTNAME from "../config";

const assembleQueryJSON = ({
    sortBy,
    searchInput,
    results,
    blockTime,
    scores,
    scoreLabelValues,
    priceValues,
    priceChangeLabelValues,
    allTimeHigh,
    currentPrice,
    marketCap,
    selectedCategories,
    selectedAlgorithms,
}) => {
    let mustQuery = [];

    if (results.showCryptos) {
        //selectedCategories
        let shouldCategoriesQuery = [];
        for (const category of selectedCategories) {
            shouldCategoriesQuery.push({
                match: {
                    categories: {
                        query: category,
                    },
                },
            });
        }
        if (shouldCategoriesQuery.length > 0)
            mustQuery.push({
                bool: {
                    should: shouldCategoriesQuery,
                },
            });

        //selectedAlgorithms
        let shouldAlgorithmsQuery = [];
        for (const algorithm of selectedAlgorithms) {
            shouldAlgorithmsQuery.push({
                term: {
                    "hashing_algorithm.keyword": algorithm,
                },
            });
        }
        if (shouldAlgorithmsQuery.length > 0)
            mustQuery.push({
                bool: {
                    should: shouldAlgorithmsQuery,
                },
            });

        //priceValues and priceChangeLabelValues
        let priceLabelMapping = { 3: "7d", 2: "30d", 1: "1y" };
        for (let i = 0; i < priceValues.length; i++) {
            let value = priceValues[i];
            let label = priceLabelMapping[priceChangeLabelValues[i]];
            let attribute = "price_change_percentage_" + label;

            if (!value) continue;

            mustQuery.push({
                range: {
                    [attribute]: {
                        gte: value,
                    },
                },
            });
        }

        // allTimeHigh
        if (allTimeHigh)
            mustQuery.push({
                range: {
                    "all_time_high(usd)": {
                        gte: allTimeHigh,
                    },
                },
            });

        // currentPrice
        if (currentPrice)
            mustQuery.push({
                range: {
                    current_price: {
                        gte: currentPrice,
                    },
                },
            });

        // marketCap
        if (marketCap)
            mustQuery.push({
                range: {
                    market_cap: {
                        gte: marketCap,
                    },
                },
            });

        // scores and scoreLabelValues
        let scoreLabelMapping = { 3: "liquidity", 2: "community", 1: "developer" };
        for (let i = 0; i < scores.length; i++) {
            let score = scores[i];
            let label = scoreLabelMapping[scoreLabelValues[i]];
            let attribute = label + "_score";

            if (!label) continue;

            mustQuery.push({
                range: {
                    [attribute]: {
                        gte: score[0],
                        lte: score[1],
                    },
                },
            });
        }

        // blockTime
        if (blockTime)
            mustQuery.push({
                script: {
                    script: {
                        source: `doc['block_time_in_minutes'].value >= ${parseInt(blockTime)}`,
                    },
                },
            });
    }
    // searchInput
    if (searchInput) {
        let ftsShouldQuery = [];

        if (results.showNews) {
            ftsShouldQuery = [
                {
                    nested: {
                        path: "news",
                        inner_hits: {},
                        query: {
                            multi_match: {
                                query: searchInput,
                                fields: ["news.title", "news.article"],
                            },
                        },
                    },
                },
            ];
        }

        if (results.showCryptos)
            ftsShouldQuery.push({
                multi_match: {
                    query: searchInput,
                    fields: ["id", "description"],
                },
            });

        mustQuery.push({
            bool: {
                should: ftsShouldQuery,
            },
        });
    }

    console.log(mustQuery);

    let jsonQuery = {
        size: 100,
        query: {
            bool: {
                must: mustQuery,
            },
        },
    };

    jsonQuery._source = !results.showNews;

    jsonQuery.sort = {
        _score: sortBy === "sortByScoreAsc" ? "asc" : "desc",
    };

    return jsonQuery;
};

export const makeSearch = async (queryData) => {
    try {
        const res = await fetch(`${API_HOSTNAME}/cryptos/_search`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(assembleQueryJSON(queryData)),
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }

        return json;
    } catch (error) {
        throw error;
    }
};
