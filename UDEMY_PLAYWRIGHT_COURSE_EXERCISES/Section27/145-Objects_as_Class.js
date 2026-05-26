//Define Object in the form of Class
module.exports = class Person //module.exports =  - This makes it public to use in other files
{
    age = 25
    get location()  //this will be treated as property. Page Objects will be created like this.
    {
        return "canada"
    }

    //Constructor - method that executes by default when you object of the class
    constructor(firstname,lastname) //these defined inside, are instance variables
    {
        this.firstname = firstname  //another variable bought here because constructor is defined inside & p is outside
        this.lastname=lastname
    }

    //methods
    fullname()
    {
        console.log(this.firstname+" "+this.lastname)
    }
}

/*let p1 = new Person("Chinmay","Agrawal") //created object of the above class
let p2 = new Person("Hetal","Patel")
console.log(p1.age)
console.log(p1.location)
p1.fullname()
console.log(p2.firstname)
p2.fullname()*/

//console.log is required to print a property of the object
//if it is a function, no need to write console.log ; just write p.function()