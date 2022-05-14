const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const database = require("./config/database");
const routes = require("./api/routes/index");
const cookieParser = require("cookie-parser");
const app = express();
const { socketSetup } = require("./config/socket-io");
const env = require("./config/env");
const cors = require("cors");
var whitelist = ["http://localhost:3000"];
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};
app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes);
database().connect();
// console.log(socket());
socketSetup(app, cors).listen(env.PORT, () => {
	console.log(`Server Started on Url ${env.URL}:${env.PORT}`);
});
