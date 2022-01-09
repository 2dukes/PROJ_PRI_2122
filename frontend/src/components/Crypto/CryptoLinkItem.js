import React, { Fragment, useCallback } from "react";
import { TableCell, TableRow, Button } from "@mui/material";

const CryptoLinkItem = ({ title, content }) => {
    const exists = content != null && content?.length > 0;

    const handleClick = useCallback(() => {
        if (exists) window.open(content[0], "_blank");
    }, [exists, content]);

    if (!exists) return null;

    return (
        <Fragment>
            <TableRow key={title} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                    <Button onClick={handleClick}>{title}</Button>
                </TableCell>
            </TableRow>
        </Fragment>
    );
};

export default CryptoLinkItem;
