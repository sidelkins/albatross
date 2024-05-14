import { React, useEffect } from "react";
import FlexBetween from "../../components/FlexBetween";
import { Typography } from "@mui/material";

const MyBag = () => {
  useEffect(() => {
    document.title = "My Bag | Albatross";
  }, []);

  return (
    <FlexBetween>
      <Typography>
        <h3>My Bag</h3>
      </Typography>
    </FlexBetween>
  );
};

export default MyBag;
