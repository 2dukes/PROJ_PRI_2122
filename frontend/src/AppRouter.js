import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/Layout/PageLayout";
import CryptoPage from "./pages/CryptoPage";
import HomePage from "./pages/HomePage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    key="/"
                    element={
                        <PageLayout key="/">
                            <HomePage />
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
};

export default AppRouter;
