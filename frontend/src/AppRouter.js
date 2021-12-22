import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PageLayout from "./components/Layout/PageLayout";
import CryptoPage from "./pages/CryptoPage";
import SearchResultsPage from "./pages/SearchResultsPage";

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route
                exact
                path="/"
                key="/"
                element={
                    <PageLayout key="/">
                        <SearchResultsPage />
                    </PageLayout>
                }
            />
                
            <Route
                exact
                path="/crypto/:id"
                key="/crypto/:id"
                element={
                    <PageLayout key="/crypto/:id">
                        <CryptoPage />
                    </PageLayout>
                }
            />
            
        </Routes>
    </BrowserRouter>
);

export default AppRouter;