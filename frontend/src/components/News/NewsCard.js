import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ArticleCard = styled(Card)({
    maxWidth: 750,
    margin: "auto",
    marginBottom: "3em",
});

const NewsCard = ({ article }) => {
    return (
        <ArticleCard>
            <CardActionArea href={article.url} target="_blank">
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {article.article}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </ArticleCard>
    );
};

export default NewsCard;
