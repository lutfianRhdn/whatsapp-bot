const apiResponse = require("../../config/apiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// model
const User = require("../models/User");

const register = (req, res) => {
	apiResponse(res, req, async () => {
		let data = {};
		bcrypt.hash(req.body.password, 10).then(async function (hash) {
			data = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: hash,
				phone: req.body.phone,
			});
		});

		return { res: data };
	});
};
const login = async (req, res) => {
	const data = await User.findOne({ email: req.body.email });
	if (!data)
		return res.json({ msg: "email / password is wrong" }).status(400);
	const isValid = await bcrypt.compare(req.body.password, data.password);
	if (!isValid)
		return res.json({ msg: "email / password is wrong" }).status(400);

	apiResponse(res, req, async () => {
		const refreshToken = jwt.sign(
			{ email: data.email, name: data.name, phone: data.phone },
			process.env.REFRESH_SECRET_TOKEN,
			{
				expiresIn: "1d",
			}
		);
		const accessToken = jwt.sign(
			{
				data: {
					email: data.email,
					name: data.name,
					phone: data.phone,
				},
			},
			process.env.ACCESS_SECRET_TOKEN,
			{
				expiresIn: "30m",
			}
		);
		const meta = {
			accesToken: accessToken,
		};
		await data.updateOne({ refreshToken: refreshToken });
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		return { res: data, meta };
	});
};
const token = async (req, res) => {
	// get refresh token and where user have refresh token
	const refreshToken = req.cookies.refreshToken;
	const user =
		refreshToken && (await User.findOne({ refreshToken: refreshToken }));
	if (!user) return res.sendStatus(403);
	let accessToken = "";
	// verify token  or decode
	jwt.verify(
		refreshToken,
		process.env.REFRESH_SECRET_TOKEN,
		(err, decoded) => {
			if (err) return res.sendStatus(403);
			// generate token until 30 seconds
			console.log("/token", decoded);
			accessToken = jwt.sign(
				{ data: decoded },
				process.env.ACCESS_SECRET_TOKEN,
				{ expiresIn: "30m" }
			);
		}
	);

	const meta = {
		accesToken: accessToken,
	};
	// await data.updateOne({ refreshToken: refreshToken });
	apiResponse(res, req, async () => {
		return { res: user, meta };
	});
};

const logout = async (req, res) => {
	const data = await User.findOne({ email: req.user.data.email });
	if (!data)
		return res.json({ msg: "email / password is wrong" }).status(400);

	apiResponse(res, req, async () => {
		await data.updateOne({ refreshToken: "" });
		res.clearCookie("refreshToken");
		return { res: data };
	});
};
module.exports = { register, login, token, logout };
