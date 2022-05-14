const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode");

const whatsapp = (handlerMessage) => {
	const client = new Client();
	client.on("qr", (qr) => {
		// console.log("QR RECEIVED", qr);
		qrcode.toDataURL(qr, function (err, url) {
			console.log("QR RECEIVED", url);
		});
	});

	client.on("ready", () => {
		console.log("Client is ready!");
	});
	handlerMessage(client);
	client.initialize();
	return client;
};

module.exports = whatsapp;
