import { React, useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { Typography, Button, CircularProgress } from "@mui/material";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import StartRoundButton from "../../components/StartRoundButton";

const RoundHistory = () => {
  const navigate = useNavigate();
  const user = useAuthUser(); // TODO: Limit form to when there is Auth
  const playerId = user.id;

  const [isLoading, setIsLoading] = useState(true);
  const [rounds, setRounds] = useState([]);

  const getPlayerRounds = async() => {
    try {
      const response = await fetch(`/api/round/get/by/userid/${playerId}`, {
        method: 'GET'
      })
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch player rounds:", error);
      return [];
    } finally {
      setIsLoading(false)
    }
  }

  const deleteRound = async(roundId) => {
    // TODO: Modal instead of JS Confirm (?)
    const confirmed = window.confirm("Are you sure you want to delete this round?")
    if(confirmed) {
      try {
        const response = await fetch(`/api/round/delete/by/id/${roundId}`, {
          method: 'DELETE'
        })
        
        if(response.ok) {
          // TODO: Confirmation Modal, Success Notification
          setRounds(prevRounds => prevRounds.filter(round => round.id !== roundId));
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    document.title = "Round History | Albatross";
    const fetchRounds = async() => {
      const data = await getPlayerRounds();
      setRounds(data);
    }
    fetchRounds();
  }, [playerId]);

  return (
    <FlexBetween>
      <Typography>
        <h3>Round History</h3>
        <StartRoundButton />
        { isLoading ? (
          <CircularProgress />
        ) : (
          <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Date</th>
              <th>Holes</th>
              <th>Actions</th>
            </tr>
          </thead>

            { rounds.length == 0 ? (
              <p>No rounds yet!</p>
            ) : (
              <tbody>
              { rounds.map (round => (
              <tr key={round.id}>
                <td>{round.course_name}</td>
                <td>{dayjs(round.date).format("MM/DD/YYYY")}</td>
                <td>{round.holes_played}</td>
                <td>
                  <Button onClick={() => navigate(`/round/${round.id}`)} variant="contained" color="primary">View / Edit</Button>
                  <Button onClick={() => deleteRound(round.id)} variant="contained" color="secondary">Delete</Button>
                </td>
              </tr>
            ))}
            </tbody>
          )}
        </table>
        )}
      </Typography>
    </FlexBetween>
  );
};

export default RoundHistory;
