import { v4 }  from 'uuid';

/* ROUND:
    id - uuid, pk
    date - date
*/

class Round {
    constructor(playerId, courseName, date, holesPlayed, scores) {
      this.id = v4();
      this.playerId = playerId;
      this.courseName = courseName;
      this.date = date;
      this.holesPlayed = JSON.stringify(holesPlayed);
      this.scores = JSON.stringify(scores);
      // this.scores = new Array(holesPlayed.length).fill(null); // Create an empty array with the length of the number of holes played
    }
}

export default Round;