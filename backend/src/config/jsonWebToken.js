const jwt = require("jsonwebtoken");
require("dotenv").config();

const jsonWebToken = () => {
	const sign = (data) => {
		console.log(data);
		return jwt.sign(data, process.env.REFRESH_SECRET_TOKEN);
	};
	return { sign };
};

module.exports = jsonWebToken;
