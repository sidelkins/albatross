import { React, useEffect } from "react";
import FlexBetween from "../../components/FlexBetween";
import { Typography } from "@mui/material";

const RoundHistory = () => {
  useEffect(() => {
    document.title = "Round History | Albatross";
  }, []);

  return (
    <FlexBetween>
      <Typography>
        <h3>Round History</h3>
      </Typography>
    </FlexBetween>
  );
};

export default RoundHistory;
