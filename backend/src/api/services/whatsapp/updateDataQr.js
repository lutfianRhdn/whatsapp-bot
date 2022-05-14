const { Client } = require("whatsapp-web.js");
const client = new Client();
let data = "";
client.initialize();
module.exports = {
	update: async (socket) => {
		// return socket.emit("whatsapp-data",);
		client.on("qr", (qr) => {
			console.log(qr);
			socket.emit("whatsapp-data", qr);
		});
	},
};
