import { useState } from "react";
import MinimumDistanceSlider from "../components/Search/MinimumDistanceSlider";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Divider, Typography, Switch } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const PageBody = styled("div")({
    margin: "6em 3em 0 2em",
    height: "75vh",
    overflowY: "auto"
});

const OptionDiv = styled("div")({
    width: "75%",
    margin: "auto",
    marginBottom: "1.5em"
})

const LeftBlock = styled("div")({
    // backgroundColor: "red",
    height: "90%",
    width: "25%",
    float: "left"
})

const RightBlock = styled("div")({
    // backgroundColor: "green",
    height: "90%",
    width: "75%",
    float: "right"
})


const SearchResultsPage = () => {
    const [numScoreClicks, setNumScoreClicks] = useState(1);  

    const handleMoreScoreClick = () => {
        if(numScoreClicks < 3)
            setNumScoreClicks(numScoreClicks => numScoreClicks + 1)
    }

    return (
        <PageBody>
            {/* <Link to="/crypto/438">Crypto 438</Link> | <Link to="/news/">Example Article</Link> */}
            <Typography variant="h3">Search Results</Typography>
            <Divider sx={{ marginBottom: "1em"}}/>
            <LeftBlock>
                <OptionDiv>
                    <Typography color="gray">Results</Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch name="cryptos" defaultChecked/>}
                            label="Cryptos"
                        />
                        <FormControlLabel
                            control={<Switch name="news" defaultChecked/>}
                            label="News"
                        />                    
                    </FormGroup>
                </OptionDiv>                
                <OptionDiv>                    
                    <Typography color="gray">Block Time in Minutes (0-10)</Typography>
                    <MinimumDistanceSlider minValue={0} maxValue={10}/>
                </OptionDiv>
                <OptionDiv>
                    <Typography color="gray">Hashing Algorithm</Typography>
                </OptionDiv>
                <OptionDiv>
                    <Typography color="gray">Categories...</Typography>
                </OptionDiv>
                <OptionDiv>                    
                    <Typography color="gray">Score (%)</Typography>
                    <MinimumDistanceSlider minValue={0} maxValue={100} hasSelect={true} numScoreClicks={numScoreClicks} onMoreClick={handleMoreScoreClick}/>
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
