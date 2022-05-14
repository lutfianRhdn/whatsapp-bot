import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
	// const { socket, setSocket}= useState('')
	useEffect(() => {
		const socket = io("http://localhost:8080/");
		// console.log(socket)
		socket.on("whatsapp-data", (data) => {
			console.log(data);
		});
		// socket.emit('login','data')
		// const test = await axios.get('http://localhost:8080/api/login');
		// console.log()
		// return 0;
	}, []);

	return (
		<div>
			<h1>ok</h1>
		</div>
	);
}

export default App;
