exports.func = function(client, msg, args) {
	try {
		if(!(msg.author.id == client.config.instance.ownerid)) {
			msg.reply(":x: Access denied.");
			return;
		}

		text = ":scroll: Server list:\n"
		client.guilds.reduce((list, guild) => {
			text += `${guild["name"]} (\`${guild["id"]}\`)\n`
		}, []);

		msg.reply(text);
	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Lists the servers the bot is currently in. [Bot owner only]";
exports.allowedInDM = true;