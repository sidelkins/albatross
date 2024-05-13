import { Sequelize } from "sequelize";

// Initialize Sequelize with SQLite as the database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db.sqlite',
  });
  
export default sequelize;