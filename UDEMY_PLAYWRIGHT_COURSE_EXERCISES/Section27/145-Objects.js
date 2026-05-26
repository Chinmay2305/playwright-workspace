//Object is a collection of properties
//Eg: Person is object with properties like FN, LN, age, gender, etc

let person = {
    firstname:"Chinmay",
    lastname:"Agrawal",
    age:38
}

console.log(person.lastname)
console.log(person['firstname'])
console.log(person['age'])

//Alter any data in the object
person.firstname = 'Chirag'
console.log(person.firstname)

//Add another property in the object person
person.gender = 'male'
console.log(person)

//Delete any property from the object eg-delete age from person
delete person.age
console.log(person)

//Check if any property exists in the object eg-do age & gender exist in person
console.log('gender' in person) //returns true
console.log('age' in person) //returns false

//Print values of all properties - iterate over properties using for loop
for(let a in person)
{
    console.log(person[a]) //- it will print all values in the object
}

let school = {
    name:"Kidzee",
    address:"Bhayli",
    years:10,
    fullschoolname : function()
    {
        return this.name+" "+this.address
    }
}
console.log(school['years'])
console.log(school.name)
let key = 'address'
console.log(school[key])
console.log(school.fullschoolname())
console.log('Print in 1 time:')
for(let b in school)
{
    if(typeof school[b] === 'function')
    {
        console.log(school[b]()) //calling it as a function with () in the end
    }
    else
    {
        console.log(school[b])
    }
}