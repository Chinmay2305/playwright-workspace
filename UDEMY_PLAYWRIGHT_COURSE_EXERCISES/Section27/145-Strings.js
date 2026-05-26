let day = 'tuesday ' //string is just like array - each character treated as a single element
console.log(day.length) //length of string

//Slice - to get partial text of string
console.log(day.slice(0,4)) //characters 0 to 3 - returns t,u,e,s (excluding 4th)
console.log(day.slice(3,5)) //characters 3 to 4 - returns s,d (excluding 5th)
console.log(day[1]) //returns nth characters, array starting from 0

//I want "tue" & "day", splitting from "s"
console.log(day.split("s"))
console.log(day.split("s")[1]) //returns second from "tue" and "day"

let splitday = day.split("s")
console.log(splitday[1].length)
console.log(splitday[1].trim.length) //this will return 0 as length is applied on trim and not trim()
console.log(splitday[1].trim().length)

//For retrieving value from browser, it is retrieved as String by default
let date = '23' //this is in string format
let nextDate = '27'
console.log(nextDate-date)

//Concatenate 2 strings
let day1 = "Monday"
let newquote = day1 + " is funday."
console.log(newquote)
//Now in newquote, I want to find where "day" is present
console.log(newquote.indexOf("day")) //searches from index 0
console.log(newquote.indexOf("day",5)) //searches from index 5

let count = 0
let val = newquote.indexOf("day")
while(val!==-1)
{
    count++
    val = newquote.indexOf("day",val+1)
}
console.log(count) //this will give number of occurences where "day" is present