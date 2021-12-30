import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ArticleCard = styled(Card)({
    margin: "1em",
});

const NewsCard = ({ article }) => {
    return (
        <ArticleCard>
            <CardActionArea href={article.url} target="_blank">
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            // max number of lines (2)
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                        }}
                    >
                        {article.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            // max number of lines (2)
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                        }}
                    >
                        {article.article}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </ArticleCard>
    );
};

export default NewsCard;
