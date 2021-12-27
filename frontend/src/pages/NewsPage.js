import React, { useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import NewsCard from "../components/News/NewsCard";
import { styled } from "@mui/material/styles";

const PageBody = styled("div")({
    margin: "6em 3em 0 3em",
    height: "75vh",
});

const NewsContainer = styled("div")({
    height: "80%",
    overflowY: "auto"
});

const Loading = styled("div")({
    position: "relative",
    height: "95vh",
    textAlign: "center",
});

const LoadingChild = styled("div")({
    position: "absolute",
    height: "25%",
    width: "25%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
});

const NewsPage = ({ articles }) => {
    const [currentPage, setPage] = useState(1);
    const articlesPerPage = 3;
    const numberPages = Math.ceil(articles.length / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const selectedArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    if(articles)
        return (
            <Loading>
                <LoadingChild>
                    <CircularProgress />
                    <h1>Loading...</h1>
                </LoadingChild>
            </Loading>
        );

    return (
        <PageBody>
            <Typography variant="h3" textAlign="center" marginBottom="1em">
                News
            </Typography>
            <NewsContainer>
                {selectedArticles.map((selectedArticle) => (
                    <NewsCard article={selectedArticle} />
                ))}
            </NewsContainer>
            <Stack spacing={2} alignItems="center" marginTop="2em">
                <Pagination
                    count={numberPages}
                    page={currentPage}
                    onChange={(_, newPage) => setPage(newPage)}
                />
            </Stack>
        </PageBody>
    );
};

export default NewsPage;
