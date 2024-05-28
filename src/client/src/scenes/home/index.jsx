import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import StartRoundButton from "../../components/StartRoundButton";

const Home = () => {
  useEffect(() => {
    document.title = "Home | Albatross";
  }, []);

  return (
    <>
      <FlexBetween>
        <Typography>
          <h3>Home</h3>
        </Typography>
        <Box>
          <StartRoundButton />
        </Box>
      </FlexBetween>
    </>
  );
};

export default Home;
