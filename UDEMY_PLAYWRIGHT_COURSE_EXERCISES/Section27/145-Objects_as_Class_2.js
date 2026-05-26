const Person = require('./145-Objects_as_Class') //calling this from previous file

let person = new Person("Harry","Potter")
console.log(person.age)
console.log(person.firstname)
console.log(person.lastname)
console.log(person.fullname())