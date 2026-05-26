console.log ("LETS RUN IF LOOP")
const flag = false
if(flag)
{
    console.log("condition satisfied")
}
else
{
    console.log("condition not satisfied")
}

if(!flag)
{
    console.log("condition satisfied")
}
else
{
    console.log("condition not satisfied")
}

//WHILE LOOP
console.log ("LETS RUN WHILE LOOP")
let i=0
while(i<10)
{
    i++
    console.log(i+". I am inside loop")
}

//DO-WHILE LOOP
console.log ("LETS RUN DO WHILE LOOP")
let j=0
while(j>10)             //In this case, it will never go inside the loop
{
    j++
    console.log(j+". I am inside loop")
}

let k=0                 //Here, it will execute once
do
{
k++
}
while(k>10)
    console.log("k is: "+k)

let required=true
while(required)
{
    console.log(required)
    required=false
}


//FOR LOOP
console.log ("LETS RUN FOR LOOP")
for (let a=0;a<=10;a++)
{
    console.log(a)
}

//GET COMMON MULTIPLES OF 2 AND 5
console.log("FROM 1 to 100, GET COMMON MULTIPLES OF 2 & 5")
for(b=1;b<=100;b++)
{
    if(b%2 == 0 && b%5 == 0)
    {
        console.log(b)
    }
}

//GET 1st 3 COMMON MULTIPLES OF 2 AND 5
console.log("FROM 1 to 100, GET 1st 3 COMMON MULTIPLES OF 2 & 5")
let n=0
for(b=1;b<=100;b++)
{
    if(b%2 == 0 && b%5 == 0)
    {
        n++
        console.log(b)
        if(n==3)
            break
    }
}

//GET MULTIPLES OF 2 OR 5
console.log("FROM 1 to 10, GET MULTIPLES OF 2 OR 5")
for(b=1;b<=10;b++)
{
    if(b%2 == 0 || b%5 == 0)
    {
        console.log(b)
    }
}