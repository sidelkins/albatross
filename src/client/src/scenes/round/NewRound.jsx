import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  ButtonGroup,
  Tooltip,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const NewRound = ({ handleClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [roundType, setRoundType] = useState("18 Holes");

  const handleBackButton = () => {
    if (handleClose) {
      handleClose();
    } else {
      navigate("/home");
    }
  };

  const handleRoundTypeChange = (type) => {
    setRoundType(type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  const TooltipTextField = ({ label, tooltip, ...props }) => (
    <Tooltip title={tooltip} arrow>
      <TextField
        label={label}
        {...props}
        sx={{
          "& .MuiInputLabel-root": {
            color: theme.palette.text.default,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.text.default,
            },
            "&:hover fieldset": {
              borderColor: theme.palette.text.default,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.text.default,
            },
          },
          "& .MuiInputBase-input": {
            color: theme.palette.text.default,
          },
        }}
      />
    </Tooltip>
  );

  return (
    <Box m="2rem 2.5rem">
      <FlexBetween sx={{ alignItems: "center" }}>
        <Typography sx={{ color: theme.palette.text.default }}>
          <h3>Start a Round</h3>
        </Typography>
        <Box>
          <Button
            onClick={handleBackButton}
            sx={{ color: theme.palette.accent.default }}
          >
            <ArrowBack />
          </Button>
        </Box>
      </FlexBetween>
      <form onSubmit={handleSubmit}>
        <Typography
          marginTop="3rem"
          sx={{
            gridColumn: "span 4",
            mb: 3,
            color: theme.palette.text.default,
          }}
        >
          Round Info
        </Typography>
        <Box className="button-group">
          <TextField
            fullWidth
            type="text"
            label="Course"
            sx={{
              gridColumn: "span 2",
              mb: 3,
              "& .MuiInputLabel-root": {
                color: theme.palette.text.default,
              },
              "& .MuiFilledInput-root": {
                "&:before": {
                  borderBottomColor: theme.palette.text.default,
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: theme.palette.text.default,
                },
                "&.Mui-focused:before": {
                  borderBottomColor: theme.palette.text.default,
                },
              },
              "& .MuiInputBase-input": {
                color: theme.palette.text.default,
              },
            }}
          />
          <Typography
            variant="body1"
            sx={{ mb: 1, color: theme.palette.text.default }}
          >
            Round Type
          </Typography>
          <ButtonGroup variant="contained" fullWidth sx={{ mb: 3 }}>
            <Button
              onClick={() => handleRoundTypeChange("18 Holes")}
              variant={roundType === "18 Holes" ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  roundType === "18 Holes"
                    ? theme.palette.accent.default
                    : "transparent",
                color:
                  roundType === "18 Holes"
                    ? theme.palette.background.default
                    : theme.palette.text.default,
                "&:hover": {
                  backgroundColor:
                    roundType === "18 Holes"
                      ? theme.palette.accent.dark
                      : "transparent",
                },
              }}
            >
              18 Holes
            </Button>
            <Button
              onClick={() => handleRoundTypeChange("Front 9")}
              variant={roundType === "Front 9" ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  roundType === "Front 9"
                    ? theme.palette.accent.default
                    : "transparent",
                color:
                  roundType === "Front 9"
                    ? theme.palette.background.default
                    : theme.palette.text.default,
                "&:hover": {
                  backgroundColor:
                    roundType === "Front 9"
                      ? theme.palette.accent.dark
                      : "transparent",
                },
              }}
            >
              Front 9
            </Button>
            <Button
              onClick={() => handleRoundTypeChange("Back 9")}
              variant={roundType === "Back 9" ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  roundType === "Back 9"
                    ? theme.palette.accent.default
                    : "transparent",
                color:
                  roundType === "Back 9"
                    ? theme.palette.background.default
                    : theme.palette.text.default,
                "&:hover": {
                  backgroundColor:
                    roundType === "Back 9"
                      ? theme.palette.accent.dark
                      : "transparent",
                },
              }}
            >
              Back 9
            </Button>
          </ButtonGroup>
          <TooltipTextField
            label="Tees"
            tooltip="e.g. Tips, Blue, White, Gold, Red"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: theme.palette.accent.default,
              color: theme.palette.background.default,
              "&:hover": {
                backgroundColor: theme.palette.accent.dark,
              },
            }}
          >
            Start Round
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewRound;
