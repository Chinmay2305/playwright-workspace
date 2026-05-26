var marks  =  Array(6)
var marks = new Array(20,40,35,12,37,100)
var marks = [15,30,45,60,75,90]
console.log("Your marks in the 3rd subject is: "+marks[2])
marks[3] = 14
console.log("Your updated marks are: "+marks)
console.log("Length of my array: "+ marks.length)

//Add 1 element into array in the end
var last_marks = 65
console.log("Add your 7th subject marks also:")
marks.push(last_marks)
console.log("Your updated marksheet with 7th subject marks: "+marks)

//Delete last element from array
console.log("Latest marksheet after deleting last entry "+marks[marks.length-1]+": ")
marks.pop()
console.log(marks)

//Add element in beginning of array
var starting_marks = 10
marks.unshift(starting_marks)
console.log("Add "+starting_marks+" in the beginning of the marksheet: "+marks)

//Find index of desired marks or element
var get_index_from_marks = 75
console.log(get_index_from_marks +" marks is at position "+marks.indexOf(get_index_from_marks)+" in the array.")

//Validate if a certain mark is there in the array or not
var marks_there=14
console.log("Is "+marks_there+" there in the marksheet? "+marks.includes(marks_there))

//Break array in sub areas
console.log(marks.slice(3,6))   //(m,n) - This will give from mth element to (n-1)th element

//Print all elements from the array
console.log("Let us now print all elements in the array")
for(let i=0;i<marks.length;i++)
{
    console.log(marks[i])
}

//Sum all the elements in the array
console.log("Let us find the sum of all elements in the array")
var sum = 0
for(let i=0;i<marks.length;i++)
{
    sum = sum+marks[i]
}
console.log(sum)