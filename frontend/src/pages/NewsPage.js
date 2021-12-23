import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import NewsCard from "../components/News/NewsCard";
import { styled } from "@mui/material/styles";

const PageBody = styled("div")({
    margin: "6em 3em 0 3em",
    height: "80vh",
    overflowY: "auto",
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
    // return (
    //     <Loading>
    //         <LoadingChild>
    //             <CircularProgress sx={{ marginRight: "1em"}} />
    //             <h1>Loading...</h1>
    //         </LoadingChild>
    //     </Loading>
    // );

    // console.log(articles);

    return (
        <PageBody>
            <Typography variant="h3" textAlign="center" marginBottom="1em">
                News
            </Typography>
            {articles.map((article) => (
                <NewsCard article={article} />
            ))}
        </PageBody>
    );

    // return (
    //     <PageBody>
    //         <h1>News Page</h1><h1>News Page</h1><h1>News Page</h1><h1>News Page</h1><h1>News Page</h1>
    //         <h1>News Page</h1><h1>News Page</h1><h1>News Page</h1><h1>News Page</h1><h1>News Page</h1><h1>News Page</h1><h1>News Page</h1>
    //     </PageBody>
    // );
};

export default NewsPage;
