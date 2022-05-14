require("dotenv").config();

const env = {
	...process.env,
	DB_URL:
		process.env.ENV == "local"
			? process.env.DB_URL_LOCAL
			: process.env.DB_URL_SERVER,
};
delete env.DB_URL_SERVER;
delete env.DB_URL_LOCAL;

module.exports = env;
