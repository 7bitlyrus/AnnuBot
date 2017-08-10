exports.func = function(client, msg, args) {
	try {
		if(!(msg.member.hasPermission("MANAGE_GUILD") || msg.author.id == client.config.ownerid)) {
			msg.reply(":x: Access denied.");
			return;
		}

		if(!args[0]) {
			serverconfig = client.loadGuildConfig(msg.guild);
			usage = `\n\nUsage: \`${client.config.instance.prefix}log {set [channel]|off}\``

			if(serverconfig.logs) {
				msg.reply(`The logging channel for this server is ${msg.guild.channels.get(serverconfig.logs)}${usage}`);
			} else {
				msg.reply(`This server has no logging channel.${usage}`);
			}

			return;
		}

		switch(args[0].toLowerCase()) {
			case "set":
				if(!args[1]) {
					setLog(msg, msg.channel)
					return;
				}

				if(args[1].match(/^\d+$/)) {
					setLog(msg, args[1])
					return;
				}

				if(args[1].match(/^<#(.+)>$/)) {
					setLog(msg, args[1].match(/^<#(.+)>$/)[1])
					return;
				}

				msg.reply(":x: Invaild channel.")
				break;

			case "off":
				serverconfig = msg.client.loadGuildConfig(msg.guild);
				delete serverconfig["logs"]
				msg.client.writeGuildConfig(msg.guild, serverconfig);
				msg.reply(":mobile_phone_off: Logging was disabled.")
				break;

			default:
				msg.reply(":x: Invaild argument.")
		}
	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Manages the logging channel. [Requires Manage Server permission]";
exports.allowedInDM = false;
exports.displayHelp = true;

function setLog(msg, channelid) {
	try {
		if(!msg.guild.channels.get(channelid)) {
			msg.reply(":x: Invaild channel.")
			return;
		}

		serverconfig = msg.client.loadGuildConfig(msg.guild);
		serverconfig["logs"] = channelid;
		msg.client.writeGuildConfig(msg.guild, serverconfig);

		msg.reply(`<#${channelid}> was set as the logging channel.`);
	} catch(e) {
		console.warn(e)
		msg.reply(":exclamation: Unable to set logging channel.")
	}
}