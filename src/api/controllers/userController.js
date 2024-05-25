import User, { verifyPassword } from "../models/User.js";
import knexInstance from '../config/database.js';
import jwt from 'jsonwebtoken';
import { hashSync } from "bcrypt";

// Create
User.save = async function(req, res) {
    const { username, password } = req.body;
    let hashedPassword = hashSync(password, 10)
    const newUser = new User(null, username, hashedPassword)
    await knexInstance('users').insert(newUser)
        .then(() => {
            res.status(200).json({
              status: 'ok',
              message: `User ${username} created`,
              user: {
                id: newUser.id,
                username: newUser.username,
                created: newUser.created
              }
            })
        })
        .catch(err => {
            if(err.code == 'SQLITE_CONSTRAINT_UNIQUE') { // Theres gotta be a more eloquent way of implementing this, haha
              res.status(500).json({
                status:'error',
                message: 'User already exists',
                code: 'INTERNAL_SERVER_ERROR',
                details: err.code
              })
            }
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
      { userId: foundUser.id, username: foundUser.username },
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

    res.json(
      { 
        token: accessToken, 
        user: 
          { 
            id: foundUser.id,
            username: foundUser.username,
            created: foundUser.created
          }
      });
  } catch (error) {
    console.error(`[USER LOGIN FAILED] User: ${username} Error: ${error}`)
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