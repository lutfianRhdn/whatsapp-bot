let socketIo;
const socketService = require("../api/services/whatsapp/updateDataQr");
module.exports = {
	socketSetup: function (app, cors) {
		const server = require("http").createServer(app);
		const socketIo = require("socket.io");

		this.socketIo = socketIo(server, {
			cors: {
				origin: "http://localhost:3000",
			},
		});
		this.socketIo.on("connection", function (socket) {
			socketService.update(socket);
		});
		return server;
	},
};
