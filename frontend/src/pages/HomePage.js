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

    return (
        <div>
            <h1>Search Results</h1>
            <p>Search Results Page</p>
            <Link to="/crypto/438">Crypto 438</Link>
            <br />
            <Link to="/news/">Example Article</Link>
            <SearchResults searchResultsCryptos={searchResultsCryptos} />
        </div>
    );
};

export default SearchResultsPage;
