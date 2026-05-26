/*Inheritance is the main pillar in OOPs
one class can inherit/acquire the properties, methods of another class
The class which inherits the properties of other is known as subclass (derived class, child class)
The class whose properties are inherited is known as superclass*/

const Person = require("./145-Objects_as_Class");

class Pet extends Person
{
    get Location()                   //this will automatically be derived from 145-Objects_as_Class
    {
        return "BlueCross"
    }
    
    constructor(firstName,lastName)     //Constructor in child should be same as in parent (145-Objects_as_Class)
    {
        //call parent class constructor - mandatory
        super(firstName,lastName) //-firstname and lastname will come automatically from person class (145-Objects_as_Class)
    }
}

let pet = new Pet("Sam","Puppy")
pet.fullname() //method was automatically available from 145-Objects_as_Class
console.log(pet.Location)

//Inheritance - function called from parent class will first access from child class itself. If nothing 
// there, then it will check in parent class