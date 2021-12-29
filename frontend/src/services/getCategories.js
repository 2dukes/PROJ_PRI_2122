import API_HOSTNAME from "../config";

export const getCategories = async () => {
    try {
        const res = await fetch(`${API_HOSTNAME}/cryptos/_search`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                _source: ["categories"],
                size: 10000,
            }),
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
