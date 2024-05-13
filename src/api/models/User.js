import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, 10); // 10 is saltRounds
      this.setDataValue('password', hashedPassword);
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
});

// Validate password method
User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// ?
(async () => {
  await sequelize.sync({ force: true });
  console.log('User table created successfully!');
})();

export default User;