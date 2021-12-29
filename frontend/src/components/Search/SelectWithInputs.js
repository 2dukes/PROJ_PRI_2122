import { Fragment, memo } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import { Select, MenuItem, Stack, Button, OutlinedInput } from "@mui/material";

const CustomFormControl = styled(FormControl)({
    marginBottom: "1em",
    width: "65%",
    "@media(max-width: 1536px)": {
        width: "100%",
    },
});

const SelectWithInputs = ({
    inputValues,
    onInputChange,
    numMoreClicks,
    onMoreClick,
    setMoreClick,
    selectValues,
    onSelectChange,
    setSelectValues,
}) => {
    return (
        <Box>
            {[...Array(numMoreClicks).keys()].map((idx) => (
                <Fragment key={idx}>
                    <CustomFormControl variant="outlined" sx={{ width: "30%", marginRight: ".5em" }}>
                        <OutlinedInput
                            sx={{ height: "35px" }}
                            value={inputValues[idx]}
                            onChange={onInputChange(idx)}
                        />
                    </CustomFormControl>
                    <CustomFormControl>
                        <Select
                            value={selectValues[idx]}
                            onChange={onSelectChange(idx, selectValues, setSelectValues)}
                            sx={{ height: "35px" }}
                        >
                            <MenuItem value={1}>Year</MenuItem>
                            <MenuItem value={2}>Month</MenuItem>
                            <MenuItem value={3}>Day</MenuItem>
                        </Select>
                    </CustomFormControl>
                </Fragment>
            ))}
            {numMoreClicks < 3 && (
                <Stack spacing={2} direction="row">
                    <Button
                        variant="text"
                        onClick={onMoreClick(numMoreClicks, selectValues, setMoreClick, setSelectValues)}
                        sx={{ margin: "auto" }}
                    >
                        More
                    </Button>
                </Stack>
            )}
        </Box>
    );
};

export default memo(SelectWithInputs);
