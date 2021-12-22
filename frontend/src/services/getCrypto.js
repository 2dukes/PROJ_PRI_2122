const API_HOSTNAME = "http://localhost:9200";

export const getCrypto = async (coinId) => {
    try {
        const res = await fetch(`${API_HOSTNAME}/cryptos/_doc/${coinId}`, {
            method: "GET",
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
