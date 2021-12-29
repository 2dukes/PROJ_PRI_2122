import React, { useState, useEffect, useCallback, Fragment } from "react";
import SelectWithSlider from "../components/Search/SelectWithSlider";
import SelectWithInputs from "../components/Search/SelectWithInputs";
// import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { Divider, Typography, Switch } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextInput from "../components/Search/TextInput";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

import { getCategories } from "../services/getCategories";
import { getHashingAlgorithms } from "../services/getHashingAlgorithms";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    top: "25%",
    float: "right",
    right: 0,
    marginRight: "5em",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "60ch",
            },
        },
    },
}));

const PageHeader = styled("div")({
    margin: "6em 3em 0 2em",
    height: "6vh",
});

const PageBody = styled("div")({
    margin: "1em 3em 0 2em",
    height: "75vh",
    overflow: "auto",
});

const OptionDiv = styled("div")({
    width: "75%",
    margin: "auto",
    marginBottom: "1em",
    marginTop: ".75em",
});

const LeftBlock = styled("div")({
    // backgroundColor: "red",
    height: "90%",
    width: "25%",
    float: "left",
});

const RightBlock = styled("div")({
    // backgroundColor: "green",
    height: "90%",
    width: "75%",
    float: "right",
});

const SearchResultsPage = () => {
    const [results, setResults] = useState([true, true]);
    const [blockTime, setBlockTime] = useState([0, 1]);
    const [scores, setScores] = useState([
        [0, 100],
        [0, 100],
        [0, 100],
    ]);
    const [scoreLabelValues, setScoreLabels] = useState([1]);
    const [numScoreClicks, setNumScoreClicks] = useState(1);
    const [priceValues, setPriceValues] = useState(["", "", ""]);
    const [priceChangeLabelValues, setPriceChangeLabelValues] = useState([1]);
    const [numPriceChangeClicks, setPriceChangeClicks] = useState(1);
    const [allTimeHigh, setAllTimeHigh] = useState("");
    const [currentPrice, setCurrentPrice] = useState("");
    const [marketCap, setMarketCap] = useState("");
    const [categories, setCategories] = useState([]);
    const [hashingAlgorithms, setHashingAlgorithms] = useState([]);

    useEffect(() => {
        getCategories()
            .then((data) => {
                let retrievedCategories = [];
                const retrievedCryptos = data?.hits?.hits;

                retrievedCryptos.forEach((crypto) => {
                    const cryptoCategories = crypto?._source.categories;
                    if (cryptoCategories != null && cryptoCategories.length > 0) {
                        cryptoCategories.forEach((category) => {
                            if (category !== "" && !retrievedCategories.includes(category))
                                retrievedCategories.push(category);
                        });
                    }
                });

                setCategories([...retrievedCategories]);
            })
            .catch((err) => {
                console.error(err);
            });

        getHashingAlgorithms()
            .then((data) => {
                let retrievedHashingAlgorithms = [];
                const retrievedCryptos = data?.hits?.hits;

                retrievedCryptos.forEach((crypto) => {
                    const hashingAlgorithm = crypto?._source.hashing_algorithm;
                    if (hashingAlgorithm !== "" && !retrievedHashingAlgorithms.includes(hashingAlgorithm))
                        retrievedHashingAlgorithms.push(hashingAlgorithm);
                });

                setHashingAlgorithms([...retrievedHashingAlgorithms]);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleBlockTimeChange = useCallback(
        (event, newValue, activeThumb) => {
            if (!Array.isArray(newValue)) return;

            if (activeThumb === 0) setBlockTime([Math.min(newValue[0], blockTime[1] - 1), blockTime[1]]);
            else setBlockTime([blockTime[0], Math.max(newValue[1], blockTime[0] + 1)]);
        },
        [blockTime]
    );

    const handleMoreClick = useCallback(
        (moreClicks, selectLabels, setMoreClicks, setSelectLabels) => () => {
            if (moreClicks < 3) {
                let auxScoreLabelValues = [...selectLabels];

                for (let elem of [1, 2, 3]) {
                    if (!auxScoreLabelValues.includes(elem)) {
                        auxScoreLabelValues.push(elem);
                        setSelectLabels(auxScoreLabelValues);
                        setMoreClicks((moreClicks) => moreClicks + 1);
                        return;
                    }
                }
            }
        },
        []
    );

    const handleScoreChange = useCallback(
        (idx) => (event, newValue, activeThumb) => {
            if (!Array.isArray(newValue)) return;

            let auxScores = [...scores];
            if (activeThumb === 0) {
                auxScores[idx] = [Math.min(newValue[0], auxScores[idx][1] - 1), auxScores[idx][1]];
                setScores(auxScores);
            } else {
                auxScores[idx] = [scores[idx][0], Math.max(newValue[1], scores[idx][0] + 1)];
                setScores(auxScores);
            }
        },
        [scores]
    );

    const handleLabelsChange = useCallback(
        (idx, values, setValues) => (event) => {
            let auxScoreLabelValues = [...values];
            auxScoreLabelValues[idx] = event.target.value;
            if (
                auxScoreLabelValues.length < 3 &&
                [...new Set(auxScoreLabelValues)].length === auxScoreLabelValues.length
            )
                setValues(auxScoreLabelValues);
        },
        []
    );

    const handleInputChange = useCallback(
        (idx) => (event) => {
            let auxPriceValues = [...priceValues];
            auxPriceValues[idx] = event.target.value;
            setPriceValues(auxPriceValues);
        },
        [priceValues]
    );

    return (
        <Fragment>
            <PageHeader>
                <Typography variant="h3" display="inline" width="50%">
                    Search Results
                </Typography>
                <Search>
                    <form>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
                    </form>
                </Search>
            </PageHeader>
            <PageBody>
                {/* <Link to="/crypto/438">Crypto 438</Link> | <Link to="/news/">Example Article</Link> */}
                <Divider />
                <LeftBlock>
                    <OptionDiv>
                        <Typography color="gray">Results</Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="cryptos"
                                        checked={results[0]}
                                        onChange={() =>
                                            setResults((results) => (results = [!results[0], results[1]]))
                                        }
                                    />
                                }
                                label="Cryptos"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="news"
                                        checked={results[1]}
                                        onChange={() =>
                                            setResults((results) => (results = [results[0], !results[1]]))
                                        }
                                    />
                                }
                                label="News"
                            />
                        </FormGroup>
                    </OptionDiv>
                    <OptionDiv>
                        <Typography color="gray">Block Time in Minutes (0-10)</Typography>
                        <SelectWithSlider
                            minValue={0}
                            maxValue={10}
                            sliderValues={blockTime}
                            onSliderChange={handleBlockTimeChange}
                        />
                    </OptionDiv>
                    <OptionDiv>
                        <Typography color="gray">Hashing Algorithm</Typography>
                    </OptionDiv>
                    <OptionDiv>
                        <Typography color="gray">Categories...</Typography>
                    </OptionDiv>
                    <OptionDiv>
                        <Typography color="gray">Score (%)</Typography>
                        <SelectWithSlider
                            minValue={0}
                            maxValue={100}
                            hasSelect={true}
                            numMoreClicks={numScoreClicks}
                            onMoreClick={handleMoreClick}
                            setMoreClick={setNumScoreClicks}
                            sliderValues={scores}
                            onSliderChange={handleScoreChange}
                            selectValues={scoreLabelValues}
                            onSelectChange={handleLabelsChange}
                            setSelectValues={setScoreLabels}
                        />
                    </OptionDiv>
                    <OptionDiv>
                        <Typography color="gray">Price Change Last (%)</Typography>
                        <SelectWithInputs
                            inputValues={priceValues}
                            onInputChange={handleInputChange}
                            numMoreClicks={numPriceChangeClicks}
                            onMoreClick={handleMoreClick}
                            setMoreClick={setPriceChangeClicks}
                            selectValues={priceChangeLabelValues}
                            onSelectChange={handleLabelsChange}
                            setSelectValues={setPriceChangeLabelValues}
                        />
                    </OptionDiv>
                    <OptionDiv>
                        <Typography color="gray">All Time High (USD)</Typography>
                        <TextInput value={allTimeHigh} setValue={setAllTimeHigh} unit="$" />
                    </OptionDiv>
                    <OptionDiv>
                        <Typography color="gray">Current Price</Typography>
                        <TextInput value={currentPrice} setValue={setCurrentPrice} unit="$" />
                    </OptionDiv>
                    <OptionDiv>
                        <Typography color="gray">Market Cap</Typography>
                        <TextInput value={marketCap} setValue={setMarketCap} unit="B$" />
                    </OptionDiv>
                    <OptionDiv>
                        <Typography color="gray">Categories</Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={categories}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Movie" />}
                        />
                    </OptionDiv>
                    <OptionDiv>
                        <Typography color="gray">Hashing Algorithm</Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={hashingAlgorithms}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Movie" />}
                        />
                    </OptionDiv>
                </LeftBlock>
                <RightBlock />
            </PageBody>
        </Fragment>
    );
};

export default SearchResultsPage;
