import Database from 'better-sqlite3';
import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const validDatabases = ['better-sqlite3', 'pg']
const dbType = process.env.DB_TYPE || 'better-sqlite3';
const dbFile = process.env.DB_FILE || 'albatross.db';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const database = process.env.DATABASE;
let config = {};

function createDatabase() {
  try {
    if(dbType == 'better-sqlite3') {
      const db = new Database(dbFile);

      config = {
        client: dbType,
        connection: {
          filename: dbFile
        },
        useNullAsDefault: true
      };
    }
    if(dbType == 'pg') {

      config = {
        client: dbType,
        connection: {
          host: dbHost,
          port: dbPort,
          user: dbUser,
          password: dbPass,
          database: database
        }
      }
    }

    if(!validDatabases.includes(dbType)) {
      console.error(`[FAIL] '${dbType}' is not a valid database type`)
    } else {
      console.log(`[SUCCESS] create '${dbType}' database`)
    }
  } catch(error) {
    console.error(`[FAIL] create ${dbType} db: ${error}`)
  }
  
}

createDatabase();
const knexInstance = knex(config);

export default knexInstance;