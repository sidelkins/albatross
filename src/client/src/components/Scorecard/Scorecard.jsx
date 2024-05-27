import React, { useEffect, useState } from 'react';
import "./Scorecard.css";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Button } from '@mui/material';

const GolfScorecard = ({ id, initialCourse, initialDate, initialScores, initialPars }) => {
  const [course, setCourse] = useState("");
  const [date, setDate] = useState(initialDate);
  const [scores, setScores] = useState(Array(18).fill(0) || initialScores);
  const [pars, setPars] = useState(Array(18).fill(0) || initialPars);

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const handleParChange = (index, value) => {
    const newPars = [...pars];
    newPars[index] = value;
    setPars(newPars);
  };

  const handleSave = async() => {
    const roundData = {
      course_name: course,
      date: date
    }
    console.log(roundData)
    try {
      const response = await fetch(`/api/round/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(roundData)
      })

      // const data = await response.json();

      if(response.status === 200) {
        // TODO: Success message
        console.log('Success')
      } else {
        console.log(response)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setCourse(initialCourse)
    setDate(initialDate)
  }, [initialCourse, initialDate])

  const totalPars = pars.reduce((acc, score) => acc + score, 0);
  const totalScore = scores.reduce((acc, score) => acc + score, 0);

  return (
    <>
    <div className="scorecard">
      <h1>Golf Scorecard</h1>
      <div className="info">
        <h2>Course:</h2>
        <input
          value={course}
          onChange={(e) => {setCourse(e.target.value)}}
        ></input>
        <DatePicker 
            fullWidth
            type="date"
            label="Date"
            defaultValue={date}
            value={date}
            onChange={(e) => setDate(e)}
          />
      </div>
      <table>
        <thead>
          <tr>
            <th>Hole</th>
            {Array.from({ length: 18 }, (_, i) => (
              <th key={i}>{i + 1}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>Pars</td>
            {pars.map((par, index) => (
              <td key={index}>
                <input
                  type="number"
                  min="0"
                  value={par}
                  onChange={(e) => handleParChange(index, parseInt(e.target.value) || 0)}
                />
              </td>
            ))}
            <td>{totalPars}</td>
          </tr>
          <tr>
            <td>Score</td>
            {scores.map((score, index) => (
              <td key={index}>
                <input
                  type="number"
                  value={score}
                  onChange={(e) => handleScoreChange(index, parseInt(e.target.value) || 0)}
                />
              </td>
            ))}
            <td>{totalScore}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Button onClick={handleSave}>Save</Button>
    </>
  );
};

export default GolfScorecard;
