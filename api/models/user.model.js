const Person = require('../models/person.model');
class User extends Person {
    constructor(firstName,lastName,birthDate,c,e){
        super(firstName,lastName,birthDate);
        this.createdAt = c;
        this.email = e;
    }
}
module.exports = User;