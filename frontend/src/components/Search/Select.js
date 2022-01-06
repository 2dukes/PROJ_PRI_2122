import { memo } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import { Select, MenuItem } from "@mui/material";

const CustomFormControl = styled(FormControl)({
    marginBottom: "1em",
    width: "65%",
    "@media(max-width: 1536px)": {
        width: "100%",
    },
});

const SelectWithInputs = ({ value, setValue }) => {
    return (
        <Box>
            <CustomFormControl>
                <Select
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    sx={{ height: "35px" }}
                >
                    <MenuItem value={"sortByScoreDesc"}>Descending Score</MenuItem>
                    <MenuItem value={"sortByScoreAsc"}>Ascending Score</MenuItem>
                </Select>
            </CustomFormControl>
        </Box>
    );
};

export default memo(SelectWithInputs);
