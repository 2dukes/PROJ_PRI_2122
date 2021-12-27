import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import { Slider, Select, MenuItem, Stack, Button } from "@mui/material";

function valuetext(value) {
    return `${value}°C`;
}

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

const minDistance = 1;

const MinimumDistanceSlider = ({ minValue, maxValue, hasSelect, numScoreClicks, onMoreClick }) => {    
    const [score, setScore] = useState(1);
    const [value1, setValue1] = useState([0, 1]);

    const handleOtherChange = (event) => {
        setScore(event.target.value);
    };


    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;

        if (activeThumb === 0) setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        else setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
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
                                getAriaLabel={() => "Minimum distance"}
                                value={value1}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
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
                        getAriaLabel={() => "Minimum distance"}
                        value={value1}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                    />
                </Box>
            )}
        </Fragment>
    );
};

export default MinimumDistanceSlider;
