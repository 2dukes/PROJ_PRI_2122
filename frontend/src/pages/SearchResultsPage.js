import React from "react";
import { Link } from "react-router-dom";

const SearchResultsPage = () => {
    return (
        <div>
            <h1>Search Results</h1>
            <p>Search Results Page</p>
            <Link to="/crypto/438">Crypto 438</Link>
            <br />
            <Link to="/news/">Example Article</Link>
        </div>
    );
};

export default SearchResultsPage;
