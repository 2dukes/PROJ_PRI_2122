import React from "react";

import { Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";

const SearchResultsPage = () => {
    return (
        <div className="App">
            <Layout
                header={<SearchBox />}
                bodyContent={<Results titleField="title" urlField="nps_link" />}
            />
        </div>
    );
};

export default SearchResultsPage;

