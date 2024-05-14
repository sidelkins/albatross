import Round from "../models/Round.js";
import knexInstance from '../config/database.js';

// Create
Round.save = async function(req, res) {
    const { playerId, courseName, holesPlayed, scores } = req.body;
    const newRound = new Round(playerId, courseName, holesPlayed, scores);
    let query = {
        id: newRound.id,
        player_id: newRound.playerId, 
        course_name: newRound.courseName, 
        holes_played: newRound.holesPlayed, 
        scores: newRound.scores
    };

    await knexInstance('rounds').insert(query)
        .then(() => {
            console.log(`[ROUND CREATED] ${playerId}`)
            res.send(200)
        })
        .catch(err => {
            console.error(`[ROUND CREATE FAILED] ${err}`)
            res.send(500)
        })
}

// Read
Round.getByUserId = async function(req, res) {
    const userId = req.body.userId;
    try {
      const result = await knexInstance('rounds').select('*').where('player_id', userId);
      res.json(result)
    } catch (error) {
      console.error(`[ROUND GET FAILED] ${error}`)
      res.send(500)
    }
}

// Update

// Delete

// Create rounds table if not exists
async function createRoundsTable() {
    try {
      const exists = await knexInstance.schema.hasTable('rounds');
      if (!exists) {
        await knexInstance.schema.createTable('rounds', table => {
          table.uuid('id').primary();
          table.uuid('player_id').unsigned().references('users.id');
          table.string('course_name').notNullable();
          table.json('holes_played');
          table.json('scores');
        });
        console.log('Rounds table created successfully');
      } else {
        console.log('Rounds table already exists');
      }
    } catch (error) {
      console.error('Error creating rounds table:', error);
    }
}
  
// Create rounds table if not exists
createRoundsTable();

export default Round;