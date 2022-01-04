import API_HOSTNAME from "../config";

const assembleQueryJSON = ({
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
    categories,
    hashingAlgorithms,
}) => {
    let mustQuery = [];

    // blockTime
    mustQuery.push({
        script: {
            script: {
                source: `doc['block_time_in_minutes'].value >= ${blockTime[0]} && doc['block_time_in_minutes'].value <= ${blockTime[1]}`,
            },
        },
    });
    
    // searchInput
    if (searchInput)
        mustQuery.push({
            multi_match: {
                query: searchInput,
                fields: ["id", "description"],
            },
        });

    let jsonQuery = {
        size: 100,
        query: {
            bool: {
                must: mustQuery,
            },
        },
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
