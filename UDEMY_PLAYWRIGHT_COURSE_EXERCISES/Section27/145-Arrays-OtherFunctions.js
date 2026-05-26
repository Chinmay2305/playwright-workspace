//REDUCE, FILTER, MAP

//IMP - REDUCE - this is to shorten long loops for any logic 
//Eg-1- Here I am calculating total marks like I would do with for loop
console.log("1. REDUCE method to calculate sum of array elements")
var marks  =  Array(6)
var marks = new Array(20,40,35,12,37,100)
let total = marks.reduce((sum,mark)=>sum+mark,0)
console.log(total)
console.log(" ")

//Eg-2- Find maximum from array
console.log("2. REDUCE method to get max number from an array")
let nums=[3,-5,2,0,1,9]
let max = nums.reduce((acc,curr)=>{
    return curr>acc?curr:acc;
},nums[0]);
console.log("Maximum number in the array ["+nums+"] is: "+max)
console.log(" ")

//Eg-3- Find minimum in array
console.log("3. REDUCE method to get min number from an array")
let min = nums.reduce((acc,curr)=>{
    return curr<acc?curr:acc;
},nums[0]);
console.log("Minimum number in the array ["+nums+"] is: "+min)
console.log(" ")

//Eg-4- Find concurrences of an object in an array
console.log("4. REDUCE method to get count of elements from an array")
let fruits=["apple","banana","guava","apple","watermelon","apple"]
let count = fruits.reduce((acc,curr)=>{
    acc[curr] = (acc[curr]||0)+1;
    return acc;
},{})
console.log(count)
console.log(" ")

//IMP - FILTER - Short way to filter array
//Print even numbers from the array
console.log("5. FILTER method to get only even numbers from a list")
var scores = [12,13,14,16]
var evenscores=[]
for(let i = 0; i<scores.length;i++)
{
    if(scores[i]%2==0)
    {
        evenscores.push(scores[i])
    }
}
console.log("The even scores are: "+evenscores)
//Same thing-getting even scores done using FILTER logic
console.log("The even scores found using FILTER are: "+scores.filter(score=>score%2==0))
console.log(" ")

//IMP - MAP function will modify each value of an array to a new value
//Here, create a new array with only even numbers and multiple each value with 3
console.log("6. MAP method to iterate each element OR each desired element of array")
var maparray = [1,2,3,4,5,6,7,8,9,10] //So, I should get [6,12]
let evenmaparray = maparray.filter(maparray=>maparray%2==0)
let multipliedevenmaparray = evenmaparray.map(maparray=>maparray*3)
console.log(multipliedevenmaparray)

//Another example of MAP-create a new array with only even numbers, 
// multiple each value with 3 and add them
console.log("7. MAP method to iterate each element OR each desired element of array and add them all")
var firstarray = [10,11,12,13,14]
let evenarray = firstarray.filter(firstarray=>firstarray%2==0)
let threetimesevenarray = evenarray.map(evenarray=>evenarray*3)
let totalval = threetimesevenarray.reduce((sum,val)=>sum+val,0)
console.log(threetimesevenarray+' & the sum is '+totalval)

//One more example to make above process more short
console.log("7. MAP+FILTER+REDUCE in 1 command")
var scores1 = [1,2,3,4]
console.log(scores1.filter(scores1=>scores1%2==0).map(scores1=>scores1*3).reduce((sum,val)=>sum+val,0))

//SORTING an array with string values
console.log("8. SORTING method to sort array with string values")
let animals = ["Tiger","Cat","Dog","Lion"]
console.log(animals.sort())
console.log(animals.reverse())

//SORTING an array with number values
console.log("9. SORTING method to sort array with numeric values")
var marks = [12,0o3,19,16,14]
console.log(marks.sort((a,b)=>a-b))