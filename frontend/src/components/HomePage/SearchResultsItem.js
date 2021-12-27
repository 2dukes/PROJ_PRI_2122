import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography, Avatar } from "@mui/material";

import { capitalizeString } from "../../utils/utils";

const SearchResultsItem = ({ searchResultsCrypto }) => {
    return (
        <Card sx={{ margin: "1em" }}>
            <Link
                to={`/crypto/${searchResultsCrypto.id}`}
                component={CardActionArea}
                style={{ textDecoration: "none" }}
            >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={searchResultsCrypto.image_url} sx={{ marginRight: "1em" }} />
                    <div>
                        <Typography gutterBottom variant="h5" component="div">
                            {capitalizeString(searchResultsCrypto.name)}
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
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};

export default SearchResultsItem;
