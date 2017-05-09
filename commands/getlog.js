exports.func = function(client, msg, args) {
	try {
		if(!(msg.member.hasPermission("MANAGE_GUILD") || msg.author.id == client.config.ownerid)) {
			msg.reply(":x: Access denied.");
			return;
		}

		serverconfig = client.loadGuildConfig(msg.guild);
		if(serverconfig.logs) {
			msg.reply(`The logging channel for this server is ${msg.guild.channels.get(serverconfig.logs)}`);
		} else {
			msg.reply(`This server has no logging channel.`);
		}
	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Returns the logging channel for the server. [Requires Manage Server permission]";
exports.allowedInDM = false;