# Shopify App - FIT&SHOP 

# Includes

- MongoDB based sessions/persistence.
- Local Tunnel instead of Ngrok to speed up _my_ dev process.
- Starter files and templates to get up to speed with development.

### Setup

- Run `npm i --force` to install all dependencies.
- Create `.env` file based on `.env.example`.
- Add `--subdomain <your-subdomain-name>` to the `tunnel` script in `package.json` to have a static subdomain and update the value at `HOST` in `.env` and your App Settings in your Partner Dashboard.
- The GDPR endpoints are available in `routes/gdpr/` folder. Add the following URLs in the GDPR section of your App Setup
  - Data Request Endpoint: `https://your.app.url/app/gdpr/customers_data_request`
  - Data Erase Endpoint: `https://your.app.url/app/gdpr/customers_redact`
  - Shop Data Erase Endpoint: `https://your.app.url/app/gdpr/shop_redact`

### Run

- Open two terminal windows with `npm run tunnel` and `npm run start`, this way you have one session running the `localtunnel` at all times.
- If you're using a locally hosted version of MongoDB, ensure `mongod` server is running.
  - To specify a directory for your MongoDB database, run `mongod --dbpath /path/to/directory`

### Misc notes

- Most scripts in `package.json` contain `rm -rf .next` || `rmdir`. to remove the generated `.next` folder to reduce caching errors.
- MongoDB collections are kept separate to allow for flexibility while building applications.
