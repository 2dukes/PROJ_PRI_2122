import React, { useCallback } from "react";
import { TableCell, TableRow, Button } from "@mui/material";

const CryptoLinkItem = ({title, content}) => {
    console.log(content);

    const exists = content != null && content?.length > 0;

    const handleClick = useCallback(() => {
        console.log("teste")
        if (exists)
            window.open(content[0], "_blank");
    }, [title, content]);

    if (!exists)
        return null;

    return (
        <div>
            <TableRow key={title} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
                    <Button onClick={handleClick}>
                        {title}
                    </Button>
            </TableCell>
        </TableRow>
        </div>
    );
};

export default CryptoLinkItem;
