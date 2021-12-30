import React, { Fragment, useState } from "react";
import { Stack, Typography, Pagination } from "@mui/material";
import NewsCard from "../News/NewsCard";
import { styled } from "@mui/material/styles";

const NewsContainer = styled("div")({
    height: "80%",
});

const SearchResultsNews = ({ articles }) => {
    const [currentPage, setPage] = useState(1);
    const articlesPerPage = 3;
    const numberPages = Math.ceil(articles.length / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const selectedArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    if (!articles || articles?.length === 0) return null;

    return (
        <Fragment>
            <Typography gutterBottom variant="h4">
                News
            </Typography>
            <NewsContainer>
                {selectedArticles.map((selectedArticle) => (
                    <NewsCard key={selectedArticle.url} article={selectedArticle} />
                ))}
            </NewsContainer>
            <Stack spacing={2} alignItems="center" margin="2em">
                <Pagination
                    count={numberPages}
                    page={currentPage}
                    onChange={(_, newPage) => setPage(newPage)}
                />
            </Stack>
        </Fragment>
    );
};

export default SearchResultsNews;
