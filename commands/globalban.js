exports.func = function(client, msg, args) {
	try {
		if(!(msg.author.id == client.config.instance.ownerid)) {
			msg.reply(":x: Access denied.");
			return;
		}

		vict = args[0]
		args.shift()

		if(!vict.match(/^[0-9]+$/)) {
			msg.reply(":x: Invaild ID.");
			return;
		}

		if(args[0]) {
			reason = args.join(" ")
		} else {
			msg.reply(":x: Missing reason.");
			return;
		}

		msg.reply(`:hammer: Global Banning ${vict}...\n`);

		client.guilds.reduce((list, guild) => {

			guild.ban(vict, `Global ban: ${reason}`)
			.then((user) => {

				msg.channel.send(`:regional_indicator_f: Banned from ${guild["name"]} (\`${guild["id"]}\`)\n`);

				if(typeof user == "string") {
					guild.fetchBans().then(bans => {
						userobj = bans.get(user)
						client.logToGuild(msg.guild, `:hammer: ${client.formatUser(userobj)} was banned from the server due to a global ban. Reason: ${reason}`);
					});
				} else {
					client.logToGuild(msg.guild, `:hammer: ${client.formatUser(user)} was banned from the server due to a global ban. Reason: ${reason}`);
				}
			})
			.catch((err) => {
				if(err) {
					console.log(err)
					msg.channel.send(`:x: Unable to ban in ${guild["name"]} (\`${guild["id"]}\`)\n`);
				}
			});
		}, []);

		msg.reply(text, {split: true});
	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Bans user from all servers the bot is currently in. [Owner only]";
exports.allowedInDM = true;
exports.displayHelp = false;