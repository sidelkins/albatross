import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GolfScorecard from "../../components/Scorecard/Scorecard";
import dayjs from "dayjs";

const Round = () => {
  const { id } = useParams();
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState("");
  const [pars, setPars] = useState("");
  const [holesPlayed, setHolesPlayed] = useState("");

  async function retrieveRound() {
    try {
      const response = await fetch(`/api/round/get/by/id/${id}`, {
        method: 'GET'
      })
      const data = await response.json();

      if(response.status === 200) {
        setCourse(data.course_name)
        setDate(dayjs(data.date))
        setScores(data.scores)
        // setPars()
        // setHolesPlayed("")
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
      id={id}
      initialCourse={course}
      initialDate={date || null}
      initialScores={scores}
      initialPars={pars}
      />
  );
};

export default Round;
