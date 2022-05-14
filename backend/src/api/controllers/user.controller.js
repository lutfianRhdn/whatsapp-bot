const apiResponse = require("../../config/apiResponse");
const User = require("../models/User");

const all = async (req, res, next) => {
	apiResponse(res, req, async () => {
		const users = await User.find();
		return { res: users };
	});
};
const store = (req, res) => {};
module.exports = { all, store };
