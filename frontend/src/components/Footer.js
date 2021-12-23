import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Footer = () => {
    let windowHeight = window.innerHeight;

    return (
        <AppBar position="absolute" color="primary" sx={{ top: windowHeight - 64 + "px" }}>
            <Toolbar>
                <Typography width="100%" textAlign="right">
                    © 2021 PRI
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
