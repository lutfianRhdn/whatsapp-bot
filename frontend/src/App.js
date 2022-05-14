import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import QRCode from "react-qr-code";
function App() {
	const [whatsappData, setwhatsappData] = useState("");
	useEffect(() => {
		const socket = io("http://localhost:8080/");
		// console.log(whatsappData);
		socket.on("whatsapp-data", (data) => {
			// console.log(data);
			setwhatsappData(data);
		});
	}, [setwhatsappData]);

	return (
		<div>
			{/* <h1>{whatsappData}</h1> */}
			<QRCode value={whatsappData} />
		</div>
	);
}

export default App;
