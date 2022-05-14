const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
		if (err) return res.sendStatus(403);
		req.user = decoded;
		next();
	});
};
module.exports = { verifyToken };
