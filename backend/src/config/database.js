const mongoose = require("mongoose");
const env = require("./env");

module.exports = function database() {
	function connect() {
		return mongoose
			.connect(env.DB_URL, {
				useNewUrlParser: true,
			})
			.then(() => {
				console.log("Connected to database");
			})
			.catch((err) => console.log(err));
	}
	return { connect };
};
