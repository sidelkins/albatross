import User from "../models/User.js";
import knexInstance from '../config/database.js';

// Create
User.save = async function(req, res) {
    const { username, password } = req.body;
    const newUser = new User(username, password)
    await knexInstance('users').insert(newUser)
        .then(() => {
            console.log(`[USER CREATED] ${username}`)
            res.send(200)
        })
        .catch(err => {
            console.error(`[USER CREATE FAILED] ${err}`)
            res.send(500)
        })
}

// Read


// Update


// Delete


// Create users table if not exists
async function createUsersTable() {
    try {
      const exists = await knexInstance.schema.hasTable('users');
      if (!exists) {
        await knexInstance.schema.createTable('users', table => {
          table.increments('id').primary();
          table.string('username').unique().notNullable();
          table.string('password').notNullable();
          table.timestamp('created_at').defaultTo(knexInstance.fn.now());
        });
        console.log('Users table created successfully');
      } else {
        console.log('Users table already exists');
      }
    } catch (error) {
      console.error('Error creating users table:', error);
    }
}
  
// Create users table if not exists
createUsersTable();

export default User;