import React, { useEffect, useCallback, Fragment } from "react";
import { styled } from "@mui/material/styles";
import {
    TextField,
    Autocomplete,
    FormControlLabel,
    FormGroup,
    Divider,
    Typography,
    Switch,
} from "@mui/material";

import SelectWithSlider from "../Search/SelectWithSlider";
import SelectWithInputs from "../Search/SelectWithInputs";
import Select from "../Search/Select";
import TextInput from "../Search/TextInput";
import { getCategories } from "../../services/getCategories";
import { getHashingAlgorithms } from "../../services/getHashingAlgorithms";

const PageBody = styled("div")({
    // margin: "1em 3em 0 2em",
});

const OptionDiv = styled("div")({
    width: "75%",
    margin: "auto",
    marginBottom: "1em",
    marginTop: ".75em",
});

const SearchFilters = ({
    sortBy,
    setSortBy,
    results,
    setResults,
    blockTime,
    setBlockTime,
    scores,
    setScores,
    scoreLabelValues,
    setScoreLabels,
    numScoreClicks,
    setNumScoreClicks,
    priceValues,
    setPriceValues,
    priceChangeLabelValues,
    setPriceChangeLabelValues,
    numPriceChangeClicks,
    setPriceChangeClicks,
    allTimeHigh,
    setAllTimeHigh,
    currentPrice,
    setCurrentPrice,
    marketCap,
    setMarketCap,
    categories,
    setCategories,
    setSelectedCategories,
    hashingAlgorithms,
    setHashingAlgorithms,
    setSelectedAlgorithms,
}) => {
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
    }, [setCategories, setHashingAlgorithms]);

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
        [scores, setScores]
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
        [priceValues, setPriceValues]
    );

    const onSwitchChange = useCallback(
        (selectedIdx, otherIdx) => () => {
            if (!(results[selectedIdx] && !results[otherIdx])) {
                let auxResults = { ...results };
                auxResults[selectedIdx] = !auxResults[selectedIdx];
                setResults(auxResults);
            }
        },
        [results, setResults]
    );

    return (
        <Fragment>
            <PageBody>
                <Divider />
                <OptionDiv>
                    <Typography color="gray">Results</Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    name="cryptos"
                                    checked={results.showCryptos}
                                    onChange={onSwitchChange("showCryptos", "showNews")}
                                />
                            }
                            label="Cryptos"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    name="news"
                                    checked={results.showNews}
                                    onChange={onSwitchChange("showNews", "showCryptos")}
                                />
                            }
                            label="News"
                        />
                    </FormGroup>
                </OptionDiv>
                <OptionDiv>
                    <Typography color="gray">Sort By</Typography>
                    <Select value={sortBy} setValue={setSortBy} />
                </OptionDiv>
                {results.showCryptos && (
                    <Fragment>
                        <OptionDiv>
                            <Typography color="gray">Block Time</Typography>
                            <TextInput
                                value={blockTime}
                                setValue={setBlockTime}
                                adornment="&ge;"
                                unit="min"
                            />
                        </OptionDiv>
                        <OptionDiv>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={categories}
                                getOptionLabel={(option) => option ? option : ""}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Categories"
                                        placeholder="Select categories"
                                    />
                                )}
                                onChange={(event, value) => setSelectedCategories(value)}
                            />
                        </OptionDiv>
                        <OptionDiv>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={hashingAlgorithms}
                                getOptionLabel={(option) => option}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Hashing Algorithms"
                                        placeholder="Select algorithms"
                                    />
                                )}
                                onChange={(event, value) => setSelectedAlgorithms(value)}
                            />
                        </OptionDiv>
                        <OptionDiv>
                            <Typography color="gray">Score</Typography>
                            <SelectWithSlider
                                minValue={0}
                                maxValue={105}
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
                            <TextInput
                                value={allTimeHigh}
                                setValue={setAllTimeHigh}
                                adornment="&gt;"
                                unit="$"
                            />
                        </OptionDiv>
                        <OptionDiv>
                            <Typography color="gray">Current Price</Typography>
                            <TextInput
                                value={currentPrice}
                                setValue={setCurrentPrice}
                                adornment="&gt;"
                                unit="$"
                            />
                        </OptionDiv>
                        <OptionDiv>
                            <Typography color="gray">Market Cap (Billion)</Typography>
                            <TextInput value={marketCap} setValue={setMarketCap} adornment="&gt;" unit="$" />
                        </OptionDiv>
                    </Fragment>
                )}
            </PageBody>
        </Fragment>
    );
};

export default SearchFilters;
