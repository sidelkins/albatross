import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GolfScorecard from "../../components/Scorecard/Scorecard";
import dayjs from "dayjs";

const Round = () => {
  const { id } = useParams();
  const [round, setRound] = useState({
    id: '',
    course_name: '',
    date: '',
    scores: [],
    pars: [],
    holes_played: []
  });

  function retrieveRound() {
    try {
      const response = fetch(`/api/round/get/by/id/${id}`, {
        method: 'GET'
      })
      const data = response.json();

      if(response.status === 200) {
        setRound({
          id: id,
          course_name: data.course_name,
          date: dayjs(data.date),
          scores: data.scores,
          pars: data.pars,
          holes_played: JSON.parse(data.holes_played)
        })
      } else {
        console.log(response)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    document.title = "Current Round | Albatross";
    retrieveRound();
  }, []);

  return (
    <GolfScorecard 
      round={round}
      />
  );
};

export default Round;
