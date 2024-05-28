// src/components/StartRoundButton.js
import React, { useState } from "react";
import { Box, Button, Modal, useTheme } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import NewRound from "../scenes/round/NewRound";

const StartRoundButton = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
          ml: "35px",
          mt: "6px",
          color: theme.palette.accent.default,
        }}
        onClick={handleOpen}
      >
        <FlagIcon sx={{ mr: "15px" }} />
        Start a Round
      </Button>
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
          <NewRound handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default StartRoundButton;
