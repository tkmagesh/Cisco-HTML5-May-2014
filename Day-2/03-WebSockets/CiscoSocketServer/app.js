var socketServer = require("nodejs-websocket");

socketServer.createServer(function(con){
	console.log("a new connection is established");
	con.on("text",function(data){
		console.log("Received from cliet - ", data);
	});
	var msgCount = 0;
	var timerId = setInterval(function(){
		++msgCount;
		con.sendText("Current time = " + new Date().toString());
		if (msgCount === 10){
			clearInterval(timerId);
			msgCount = 0;
		}
	},2000);
}).listen(9090);
console.log("Socket server listening on port 9090..");