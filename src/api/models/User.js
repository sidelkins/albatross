import { v4 }  from 'uuid';
import bcrypt from 'bcrypt';

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
    constructor(username, password, firstName, lastName, email) {
        this.id = v4();
        this.username = username;
        this.password = this.hashPassword(password);
        this.created = new Date();
    }

    hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hashSync(password, saltRounds);
    }

    verifyPassword(passwordToCheck, passwordHash) {
        return bcrypt.compareSync(passwordToCheck, passwordHash)
    }
}

export default User;