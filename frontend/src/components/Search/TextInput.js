import { useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const TextInput = ({ unit, value, setValue }) => {
    return (
        <Box>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
                <OutlinedInput
                    sx={{ height: "35px" }}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    startAdornment={<InputAdornment position="start">></InputAdornment>}
                    endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
                />
            </FormControl>
        </Box>
    );
};

export default TextInput;
