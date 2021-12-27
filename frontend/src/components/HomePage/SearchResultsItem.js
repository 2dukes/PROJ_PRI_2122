import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

const SearchResultsItem = ({ searchResultsCrypto }) => {
    return (
        <Card sx={{ margin: "1em" }}>
            <Link
                to={`/crypto/${searchResultsCrypto.id}`}
                component={CardActionArea}
                style={{ textDecoration: "none" }}
            >
                <CardMedia
                    component="img"
                    height="140"
                    image={searchResultsCrypto.image_url}
                    alt="Cryptocurrency logo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {searchResultsCrypto.name}
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
                        {searchResultsCrypto.description}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
};

export default SearchResultsItem;
