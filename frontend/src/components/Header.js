import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="absolute">
                <Toolbar>
                    <MenuItem key={"Crypto Ledger"} component={Link} to="/">
                        <Typography textAlign="center">{"Crypto Ledger"}</Typography>
                    </MenuItem>                    
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
