const Router = require("koa-router");
const customersDataRequest = new Router();

customersDataRequest.post("/app/gdpr/customers_data_request", async (ctx) => {
  console.log(ctx.request.body);
});

module.exports = customersDataRequest;
