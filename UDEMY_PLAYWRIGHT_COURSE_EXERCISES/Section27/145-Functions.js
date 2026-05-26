//Function to add 2 numbers
function add(a,b)
{
    return a+b
}
console.log(add(2,3))

//Anonymous functions - Functions without any name
//See same adding example below:
let sum = (a,b)=>a+b //no 'add' name here
console.log(sum(2,1))

//var - at global level OR function level
var greet = "evening"
if(1==1)
{
    var greet = "afternoon" //this will replace previous greet
}
function print()
{
   var greet = "morning" //but this will not replace as it is inside function
}
console.log(greet)

//let - at global level OR block level. So here, value of word will not change
let word = "one"
if(2==2)
{
    let word="two"
}
function printsecond()
{
    let word="three"
}
console.log(word)