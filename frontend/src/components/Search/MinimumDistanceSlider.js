import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import { Slider, Select, MenuItem, Stack, Button } from "@mui/material";

const CustomSlider = styled(Slider)({
    '@media(max-width: 1536px)': {
        width: "100%",
        marginBottom: "1em"
    }
});

const CustomFormControl = styled(FormControl)({
    marginBottom: "1em",
    width: "65%", 
    '@media(max-width: 1536px)': {    
        width: "100%",
    }
});

const MinimumDistanceSlider = ({ minValue, maxValue, hasSelect, numScoreClicks, sliderValues, onMoreClick, onSliderChange }) => {    
    const [score, setScore] = useState(1);

    const handleOtherChange = (event) => {
        setScore(event.target.value);
    };

    return (
        <Fragment>
            {hasSelect ? (
                <Box>
                    {[...Array(numScoreClicks).keys()].map(idx => (
                        <Fragment key={idx}>
                            <CustomSlider
                                sx={{width: "25%", position: "relative", top: ".5em", marginRight: "1em", marginLeft: ".5em"}}
                                min={minValue}                                
                                max={maxValue}
                                valueLabelDisplay="auto"
                                value={sliderValues[idx]}
                                onChange={onSliderChange(idx)}
                                disableSwap
                            />
                            <CustomFormControl>
                                <Select
                                    value={score}
                                    onChange={handleOtherChange}
                                    inputProps={{ "aria-label": "Without label" }}
                                    sx={{ height: "40px" }}
                                >
                                    <MenuItem value={1}>Developer Score</MenuItem>
                                    <MenuItem value={2}>Community Score</MenuItem>
                                    <MenuItem value={3}>Liquidity Score</MenuItem>
                                </Select>
                            </CustomFormControl>
                        </Fragment>
                    ))}
                    {numScoreClicks < 3 && <Stack spacing={2} direction="row">
                        <Button variant="text" onClick={onMoreClick} sx={{ margin: "auto" }}>More</Button>                                            
                    </Stack>}
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

export default MinimumDistanceSlider;
