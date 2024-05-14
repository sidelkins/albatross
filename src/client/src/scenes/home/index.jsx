import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import FlexBetween from "../../components/FlexBetween";
import NewRound from "../round/NewRound";
import { useTheme } from "@emotion/react";

const Home = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Button
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ml: "35px",
              mt: "6px",
              color: theme.palette.accent.default,
            }}
            onClick={handleOpen} // Open the modal when button is clicked
          >
            <FlagIcon sx={{ mr: "15px" }} />
            Start a Round
          </Button>
        </Box>
      </FlexBetween>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <NewRound handleClose={handleClose} />{" "}
          {/* Pass handleClose to close the modal */}
        </Box>
      </Modal>
    </>
  );
};

export default Home;
