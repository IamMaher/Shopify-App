const Router = require("koa-router");
const customersRedact = new Router();

customersRedact.post("/app/gdpr/customers_redact", async (ctx) => {
  console.log(ctx.request.body);
});

module.exports = customersRedact;
