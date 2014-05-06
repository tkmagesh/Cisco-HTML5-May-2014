var socketServer = require("nodejs-websocket");

var server = socketServer.createServer(function(con){
	console.log("a new connection is established");
	con.on("text",function(data){
		console.log("Received from cliet - ", data);
		server.connections.forEach(function(conn){
			conn.sendText(data);
		});
	});
	
}).listen(9090);
console.log("Socket server listening on port 9090..");