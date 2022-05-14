const fs = require("fs");
const io = require("socket.io");
require("dotenv").config();

let sessionCfg;
const SESSION_PATH = "./session.json";
const app = express();
app.get("/", (req, res) => {
	res.status(200).json({ status: "success" });
});
if (fs.existsSync(SESSION_PATH)) {
	sessionCfg = require(SESSION_PATH);
}
app.listen(process.env.PORT, () => {
	console.log("listening on url " + process.env.URL + process.env.PORT);
});
