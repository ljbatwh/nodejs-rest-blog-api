class Person {
    constructor(firstName,lastName,birthDate){
        this.firstName=firstName;
        this.lastName=lastName;
        this.birthDate=new Date(birthDate);
    }
}
module.exports = Person;