var productPrices=[30,20,15,60,10,55]

//map method to apply 10% discount all prices
let discountedPrices = productPrices.map(productPrices=>productPrices*0.1)
console.log(productPrices)
console.log(discountedPrices)

//filter method to list products below $50
let affordableProducts = productPrices.filter(productPrices=>productPrices<50)
console.log(affordableProducts)

//reduce method to calculate total cost of all "affordable items"
let totalcost = affordableProducts.reduce((sum,val)=>sum+val,0)
console.log(totalcost)