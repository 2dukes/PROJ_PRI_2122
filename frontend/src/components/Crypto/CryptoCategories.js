import React from "react";
import { Stack, Chip } from "@mui/material";

const CryptoCategories = ({ categories }) => {

    if (categories == null || categories?.length === 0)
        return null;
    return (
        <Stack direction="row" spacing={1} sx={{ marginTop: "1em" }}>
                {
                    categories.map((category) => <Chip label={category} />)
                }
        </Stack>
    );
}

export default CryptoCategories;
