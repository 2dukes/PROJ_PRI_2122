import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Footer = () => {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography width="100%" textAlign="right">
                    © 2021 PRI
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
