exports.func = function(client, msg, args) {
	msg.channel.send("Pinging...").then(m => m.edit(`Pong! Roundtrip: ${m.createdTimestamp - msg.createdTimestamp}ms. Heartbeat: ${Math.round(client.ping)}ms`));
};