exports.func = function(client, msg, args) {
	try {
		if(!(msg.member.hasPermission("MANAGE_GUILD") || msg.author.id == client.config.ownerid)) {
			msg.reply(":x: Access denied.");
			return;
		}

		serverconfig = client.loadGuildConfig(msg.guild);
		serverconfig["logs"] = msg.channel.id;
		client.writeGuildConfig(msg.guild, serverconfig);

		msg.reply("This channel is now set as the logging channel for this server.")
	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Sets the current channel as the logging channel for the server. [Requires Manage Server permission]";
exports.allowedInDM = false;