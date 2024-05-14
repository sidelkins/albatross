import Database from 'better-sqlite3';
import knex from 'knex';
import dotenv from 'dotenv';

const dbType = process.env.DB_TYPE || 'better-sqlite3';
const dbFile = process.env.DB_FILE || 'albatross.db';

// better-sqlite3 Database Creation
if(dbType == 'better-sqlite3') {
  try{ 
    const db = new Database(dbFile);
    db.pragma('journal_mode = WAL');
    console.log(`[SUCCESS] create better-sqlite3 db`)
  } catch (error) {
    console.error(`[FAIL] create better-sqlite3 db: ${error}`)
  }
}

const config = {
  client: dbType,
  connection: {
    filename: dbFile
  }
};

const knexInstance = knex(config);

export default knexInstance;