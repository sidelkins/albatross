import Round from "../models/Round.js";
import knexInstance from '../config/database.js';

// Create
Round.save = async function(req, res) {
    const { player_id, course_name, date, holes_played, scores } = req.body;
    const newRound = new Round(player_id, course_name, date, holes_played, scores);

    //TODO: Field validation

    let query = {
        id: newRound.id,
        player_id: newRound.playerId, 
        course_name: newRound.courseName, 
        date: newRound.date,
        holes_played: newRound.holesPlayed, 
        scores: newRound.scores
    };

    await knexInstance('rounds').insert(query)
        .then(() => {
            console.log(`[ROUND CREATED] ${newRound.id}`)
            res.status(200).json({id: newRound.id})
        })
        .catch(err => {
            console.error(`[ROUND CREATE FAILED] ${err}`)
            res.send(500)
        })
}

// Read
Round.getByUserId = async function(req, res) {
    const userId = req.params.id;
    try {
      const result = await knexInstance('rounds').select('id', 'course_name', 'date', 'holes_played').where('player_id', userId);
      res.json(result)
    } catch (error) {
      console.error(`[ROUND GET FAILED] ${error}`)
      res.send(500)
    }
}

Round.getById = async function(req, res) {
  const roundId = req.params.id;
  try {
    const result = await knexInstance('rounds').select('*').where('id', roundId).first();
    res.json(result)
  } catch (error) {
    console.error(`[ROUND GET FAILED] ${error}`)
    res.send(500)
  }
}

// Update
Round.update = async function(req, res) {
  const roundId = req.params.id;
  const { course_name, date } = req.body;
  await knexInstance('rounds').where('id', roundId)
    .update({
      course_name: course_name,
      date: date
    })
    .then(() => {
      res.send(200)
    })
}

// Delete
Round.deleteById = async function(req, res) {
  const roundId = req.params.id;
  console.log(roundId)
    await knexInstance('rounds').where('id', roundId).delete()
      .then(() => {
        console.log(`[ROUND DELETED] ${roundId}`)
        res.send(200)
      })
      .catch(err => {
        console.error(`[ROUND DEL FAILED] ${err}`)
        res.send(500)
      });
}

// Create rounds table if not exists
async function createRoundsTable() {
    try {
      const exists = await knexInstance.schema.hasTable('rounds');
      if (!exists) {
        await knexInstance.schema.createTable('rounds', table => {
          table.uuid('id').primary();
          table.uuid('player_id').unsigned().references('users.id');
          table.string('course_name').notNullable();
          table.date('date');
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