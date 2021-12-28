import { useState } from "react";
import MinimumDistanceSlider from "../components/Search/MinimumDistanceSlider";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Divider, Typography, Switch } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const PageBody = styled("div")({
    margin: "6em 3em 0 2em",
    height: "75vh",
    overflowY: "auto",
});

const OptionDiv = styled("div")({
    width: "75%",
    margin: "auto",
    marginBottom: "1.5em",
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
    const [blockTime, setBlockTime] = useState([0, 1]);
    const [scores, setScores] = useState([[0, 100], [0, 100], [0, 100]]);
    const [numScoreClicks, setNumScoreClicks] = useState(1);

    const handleBlockTimeChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;

        if (activeThumb === 0) setBlockTime([Math.min(newValue[0], blockTime[1] - 1), blockTime[1]]);
        else setBlockTime([blockTime[0], Math.max(newValue[1], blockTime[0] + 1)]);
    };

    const handleMoreScoreClick = () => {
        if (numScoreClicks < 3) setNumScoreClicks((numScoreClicks) => numScoreClicks + 1);
    };

    const handleScoreChange = (idx) => (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;
    
        let auxScores = [...scores]
        if (activeThumb === 0) {
            auxScores[idx] = [Math.min(newValue[0], auxScores[idx][1] - 1), auxScores[idx][1]]
            setScores(auxScores)
        }
        else {
            auxScores[idx] = [scores[idx][0], Math.max(newValue[1], scores[idx][0] + 1)] 
            setScores(auxScores) 
        }
    };

    return (
        <PageBody>
            {/* <Link to="/crypto/438">Crypto 438</Link> | <Link to="/news/">Example Article</Link> */}
            <Typography variant="h3">Search Results</Typography>
            <Divider sx={{ marginBottom: "1em" }} />
            <LeftBlock>
                <OptionDiv>
                    <Typography color="gray">Results</Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch name="cryptos" defaultChecked />}
                            label="Cryptos"
                        />
                        <FormControlLabel control={<Switch name="news" defaultChecked />} label="News" />
                    </FormGroup>
                </OptionDiv>
                <OptionDiv>
                    <Typography color="gray">Block Time in Minutes (0-10)</Typography>
                    <MinimumDistanceSlider
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
                    <MinimumDistanceSlider
                        minValue={0}
                        maxValue={100}
                        hasSelect={true}
                        numScoreClicks={numScoreClicks}
                        onMoreClick={handleMoreScoreClick}
                        sliderValues={scores}
                        onSliderChange={handleScoreChange}
                    />
                </OptionDiv>
                {/* <OptionDiv>                    
                    <Typography color="gray">Community Score (%)</Typography>
                    <MinimumDistanceSlider minValue={0} maxValue={100}/>
                </OptionDiv>
                <OptionDiv>                    
                    <Typography color="gray">Liquidity Score (%)</Typography>
                    <MinimumDistanceSlider minValue={0} maxValue={100}/>
                </OptionDiv> */}
            </LeftBlock>
            <RightBlock />
        </PageBody>
    );
};

export default SearchResultsPage;
