import React from "react";
import { Card, CardActionArea, CardContent, Typography, Avatar } from "@mui/material";
import { Markup } from "interweave";

import { capitalizeString } from "../../utils/utils";

const SearchResultsItem = ({ searchResultsCrypto }) => {
    return (
        <Card sx={{ margin: "1em" }}>
            <CardActionArea href={`/crypto/${searchResultsCrypto.id}`}>
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
                            <Markup blockList="a" content={searchResultsCrypto.description} />
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default SearchResultsItem;
