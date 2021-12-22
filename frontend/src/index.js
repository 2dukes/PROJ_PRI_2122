import React from 'react';

import ReactDOM from 'react-dom';
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider } from "@elastic/react-search-ui";

import AppRouter from './AppRouter';

const API_HOSTNAME = "http://localhost:9200";

const connector = new AppSearchAPIConnector({
    searchKey: "search-371auk61r2bwqtdzocdgutmg",
    engineName: "search-ui-examples",
    endpointBase: API_HOSTNAME,
    cacheResponses: false
});

ReactDOM.render(
    <React.StrictMode>
        <SearchProvider
            config={{
                apiConnector: connector
            }}
        >
            <AppRouter />
        </SearchProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
