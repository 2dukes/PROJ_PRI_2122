import React from "react";
import { Paper } from "@mui/material";

const CryptoPriceChange = ({ timeFrame, percentage }) => {
    return (
        <Paper
            sx={{ 
                background: percentage > 0 ? "green" : "#ba000d",
                padding: "0.5em",
                color: "white",
                width: "6em",
                display: "flex",
                justifyContent: "center"
            }}
        >
            {percentage.toFixed(2)}% | {timeFrame}
        </Paper>
    );
}

export default CryptoPriceChange;
