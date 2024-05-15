import User, { verifyPassword } from "../models/User.js";
import knexInstance from '../config/database.js';
import jwt from 'jsonwebtoken';

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
User.getById = async function(req, res) {
  const id = req.body.id;
  try {
    const result = await knexInstance('users').select('id', 'username').where( {id} );
    res.json(result)
  } catch (error) {
    console.error(`[USER GET FAILED] ${error}`)
    res.send(500)
  }
}

User.getByUsername = async function(req, res) {
  const username = req.body.username;
  try {
    const result = await knexInstance('users').select('id', 'username').where( {username} );
    res.json(result);
  } catch (error) {
    console.error(`[USER GET FAILED] ${error}`)
    res.send(500)
  }
}

User.login = async function(req, res) {
  const { username, password } = req.body;
  try {
    const foundUser = await knexInstance('users')
    .where('username', username)
    .first();
    const passwordCheck = verifyPassword(password, foundUser.password)

    if(!foundUser) {
      res.sendStatus(404)
    }
    if(!passwordCheck) {
      res.status(400).json({ message: "Incorrect username or password." })
    }

    const accessToken = jwt.sign(
      { userId: foundUser.userId, username: foundUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    )

    // const refreshToken = jwt.sign(
    //   { username: foundUser.username },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: "7d" }
    // )

    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    res.json({ token: accessToken });
  } catch (error) {
    console.error(`[USER LOGIN FAILED] ${error}`)
    res.sendStatus(500)
  }
}


// Update


// Delete


// Create users table if not exists
async function createUsersTable() {
    try {
      const exists = await knexInstance.schema.hasTable('users');
      if (!exists) {
        await knexInstance.schema.createTable('users', table => {
          table.uuid('id').primary();
          table.string('username').unique().notNullable();
          table.string('password').notNullable();
          table.timestamp('created').defaultTo(knexInstance.fn.now());
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