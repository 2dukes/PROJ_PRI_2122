import { Client } from "@elastic/elasticsearch";

const API_HOSTNAME = "http://localhost:9200";

const client = new Client({ node: API_HOSTNAME });

export const getCrypto = async (coinId) => {
    try {

        const res = client.asyncSearch.get({
            id: coinId,
        })

        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }

        return json;

    } catch (error) {
        throw error;
    }
}
