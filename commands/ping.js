exports.func = function(client, msg, args) {
	try {
		msg.channel.send("Pinging...").then(m => m.edit(`Pong! Roundtrip: ${m.createdTimestamp - msg.createdTimestamp}ms. Heartbeat: ${Math.round(client.ping)}ms.`));
	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Returns information about latency.";
exports.allowedInDM = true;