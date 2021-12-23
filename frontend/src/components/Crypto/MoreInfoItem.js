import React from "react";
import { TableCell, TableRow } from "@mui/material";

const MoreInfoItem = ({ title, content }) => {
    return (
        <TableRow key="" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
                {title}
            </TableCell>
            <TableCell align="right">{content}</TableCell>
        </TableRow>
    );
};

export default MoreInfoItem;
