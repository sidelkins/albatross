import { React, useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { Typography, Button } from "@mui/material";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const RoundHistory = () => {
  const user = useAuthUser(); // TODO: Limit form to when there is Auth
  const playerId = user.id;

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
    }
  }

  const editRound = async(roundId) => {
    // TODO
  }

  const deleteRound = async(roundId) => {
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
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Holes</th>
            </tr>
          </thead>
          <tbody>
            { rounds.map (round => (
              <tr key={round.id}>
                <td>{round.course_name}</td>
                <td>{round.holes_played}</td>
                <td>
                  <Button onClick={() => editRound(round.id)} variant="contained" color="primary">Edit</Button>
                  <Button onClick={() => deleteRound(round.id)} variant="contained" color="secondary">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Typography>
    </FlexBetween>
  );
};

export default RoundHistory;
