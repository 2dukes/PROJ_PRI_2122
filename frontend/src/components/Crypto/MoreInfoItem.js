import React from "react";
import { TableCell, TableRow } from "@mui/material";

const MoreInfoItem = ({ title, content }) => {

    const exists = content != null && content != "";

    if (!exists)
        return null;

    return (
        <TableRow key={title} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
                {title}
            </TableCell>
            <TableCell align="right">{content}</TableCell>
        </TableRow>
    );
};

export default MoreInfoItem;
