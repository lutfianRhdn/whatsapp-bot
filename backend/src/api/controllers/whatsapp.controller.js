const { socketOn } = require("../../config/socket-io");

const login = (req, res) => {
	socketOn((socket) => {
		socket.on("login", () => {
			console.log("ok");
		});
	});
};
module.exports = { login };
