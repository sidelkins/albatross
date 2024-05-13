import Database from 'better-sqlite3';
import knex from 'knex';

const dbFile = 'albatross.db';

// better-sqlite3 Database Creation
const db = new Database(dbFile);
db.pragma('journal_mode = WAL');

const knexInstance = knex({
  client: 'better-sqlite3', // or 'sqlite3'
  connection: {
    filename: dbFile
  }
})

export default knexInstance;