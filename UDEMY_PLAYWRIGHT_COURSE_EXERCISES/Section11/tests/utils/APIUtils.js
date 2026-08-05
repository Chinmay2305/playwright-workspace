class APIUtils
{
    constructor(apiContext,loginPayLoad)
    {
        this.apiContext = apiContext;
        this.loginPayLoad=loginPayLoad;
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
        });//200,201
        const loginResponseJSON = await loginResponse.json();
        const token = loginResponseJSON.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayLoad)
    {
        let response = {};
        response.token = await this.getToken(); //await is compulsory here because we are calling an async method: getToken() here
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayLoad,
            headers:{
                'Authorization':response.token,
                'Content-Type':'application/json'
            },
        })
        const orderResponseJSON = await orderResponse.json();
        console.log(orderResponseJSON);
        const orderId = orderResponseJSON.orders[0];
        response.orderId = orderId;
        return response;
    }
}

module.exports = {APIUtils}; //this is important because other files in the project don't know anything about this file. Now it is globally visible.

//"this" refers to current class