const Router = require("koa-router");
const shopRedact = new Router();

shopRedact.post("/app/gdpr/shop_redact", async (ctx) => {
  console.log(ctx.request.body);
});

module.exports = shopRedact;
