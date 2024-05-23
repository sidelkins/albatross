import { v4 }  from 'uuid';
import bcrypt from 'bcrypt';
import PlayerStats from './PlayerStats.js';

/* USER:
    id - int, autoinc, pk
    username - string, nullable, unique
    password - string, notnullable, bcrypt
    firstName - string, nullable, notunique
    lastName - string, nullable, notunique
    email - string, nullable, unique
    created - date, CURRENT_TIMESTAMP
*/

class User {
    constructor(id, username, password, firstName, lastName, email) {
        this.id = v4() || id;
        this.username = username;
        this.password = password;
        this.created = new Date();
        // this.PlayerStats = new PlayerStats();
    }
}

export function verifyPassword(passwordToCheck, passwordHash) {
    return bcrypt.compareSync(passwordToCheck, passwordHash)
}

export default User;