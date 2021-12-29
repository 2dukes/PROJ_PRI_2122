import { Fragment, memo } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import { Slider, Select, MenuItem, Stack, Button } from "@mui/material";

const CustomSlider = styled(Slider)({
    "@media(max-width: 1536px)": {
        width: "100%",
        marginBottom: "1em",
    },
});

const CustomFormControl = styled(FormControl)({
    marginBottom: "1em",
    width: "65%",
    "@media(max-width: 1536px)": {
        width: "100%",
    },
});

const SelectWithSlider = ({
    minValue,
    maxValue,
    hasSelect,
    numMoreClicks,
    sliderValues,
    onMoreClick,
    setMoreClick,
    onSliderChange,
    selectValues,
    onSelectChange,
    setSelectValues,
}) => {
    return (
        <Fragment>
            {hasSelect ? (
                <Box>
                    {[...Array(numMoreClicks).keys()].map((idx) => (
                        <Fragment key={idx}>
                            <CustomSlider
                                sx={{
                                    width: "25%",
                                    position: "relative",
                                    top: ".5em",
                                    marginRight: "1em",
                                    marginLeft: ".5em",
                                }}
                                min={minValue}
                                max={maxValue}
                                valueLabelDisplay="auto"
                                value={sliderValues[idx]}
                                onChange={onSliderChange(idx)}
                                disableSwap
                            />
                            <CustomFormControl>
                                <Select
                                    value={selectValues[idx]}
                                    onChange={onSelectChange(idx, selectValues, setSelectValues)}
                                    inputProps={{ "aria-label": "Without label" }}
                                    sx={{ height: "35px" }}
                                >
                                    <MenuItem value={1}>Developer Score</MenuItem>
                                    <MenuItem value={2}>Community Score</MenuItem>
                                    <MenuItem value={3}>Liquidity Score</MenuItem>
                                </Select>
                            </CustomFormControl>
                        </Fragment>
                    ))}
                    {numMoreClicks < 3 && (
                        <Stack spacing={2} direction="row">
                            <Button
                                variant="text"
                                onClick={onMoreClick(
                                    numMoreClicks,
                                    selectValues,
                                    setMoreClick,
                                    setSelectValues
                                )}
                                sx={{ margin: "auto" }}
                            >
                                More
                            </Button>
                        </Stack>
                    )}
                </Box>
            ) : (
                <Box>
                    <Slider
                        sx={{ width: "95%", marginLeft: ".5em" }}
                        min={minValue}
                        max={maxValue}
                        value={sliderValues}
                        onChange={onSliderChange}
                        valueLabelDisplay="auto"
                        disableSwap
                    />
                </Box>
            )}
        </Fragment>
    );
};

export default memo(SelectWithSlider);
