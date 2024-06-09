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
import dayjs from 'dayjs';
import { DatePicker } from "@mui/x-date-pickers"
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import FlexBetween from "../../components/FlexBetween";

const NewRound = ({ handleClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const user = useAuthUser(); // TODO: Limit form to when there is Auth
  const playerId = user.id;
  const [courseName, setCourseName] = useState("");
  const [date, setDate] = useState()
  const [roundType, setRoundType] = useState("");
  const [holesPlayed, setHolesPlayed] = useState([]);
  const [tees, setTees] = useState("");

  const handleBackButton = () => {
    if (handleClose) {
      handleClose();
    } else {
      navigate("/home");
    }
  };

  const handleRoundTypeChange = (type) => {
    setRoundType(type)
    if(type === "18 Holes") {
      // Create an array of 18 elements containg numbers 1-18
      setHolesPlayed(Array.from({ length: 18 }, (v, i) => i + 1));
    } if(type === "Front 9") {
      // Create an array of 9 elements containing numbers 1-9
      setHolesPlayed(Array.from({ length: 9 }, (v, i) => i + 1));
    } if(type === "Back 9") {
      // Create an array of 9 elements containing numbers 9-18
      setHolesPlayed(Array(9).fill().map((_, i) => i + 9));
    } if(type === "Other") {
      // TODO: Logic for selected holes
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formattedDate = dayjs(date).toISOString();

    let formData = // TODO: Implement formik like on login (?)
    {
      course_name: courseName,
      date: formattedDate,
      holes_played: holesPlayed,
      player_id: playerId
    }

    try {
        const response = await fetch("/api/round/create", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        const data = await response.json();

        if(response.status === 200) {
          // TODO: Success Modal (?)
          navigate(`/round/${data.id}`)
        } else {
          console.log(response)
        }

    } catch (error) {
      console.log(error)
    }
  };

  const TooltipTextField = ({ label, tooltip, value, onChange, ...props }) => (
    <Tooltip title={tooltip} arrow>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
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
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
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
          <DatePicker 
            fullWidth
            type="date"
            label="Date"
            defaultValue={dayjs(Date())}
            value={date}
            onChange={(e) => setDate(e)}
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
            <Button // TODO: add selector for which holes were played
              onClick={() => handleRoundTypeChange("Other")}
              variant={roundType === "Other" ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  roundType === "Other"
                    ? theme.palette.accent.default
                    : "transparent",
                color:
                  roundType === "Other"
                    ? theme.palette.background.default
                    : theme.palette.text.default,
                "&:hover": {
                  backgroundColor:
                    roundType === "Other"
                      ? theme.palette.accent.dark
                      : "transparent",
                },
              }}
            >
              Other
            </Button>
          </ButtonGroup>
          <TooltipTextField
            label="Tees"
            tooltip="e.g. Tips, Blue, White, Gold, Red"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tees}
            onChange={(e) => setTees(e.target.value)}
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
