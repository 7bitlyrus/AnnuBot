exports.func = function(client, msg, args) {
	if(!(msg.member.hasPermission("BAN_MEMBERS") || msg.author.id == client.config.ownerid)) {
		msg.reply(":x: Access denied.");
		return;
	}
	if(!args[0]) {
		msg.reply(":x: Missing argument.")
		return;
	}

	vict = args[0]
	args.shift()
	if(args[0]) {
		reason = args.join(" ")
	} else {
		reason = ""
	}

	msg.guild.ban(vict, reason)
	.then((user) => {
		if(typeof user == "string") {
			msg.guild.fetchBans().then(bans => {
				userobj = bans.get(user)
				msg.reply(`:boot: Banned ${client.formatUser(userobj)}`)
				client.logToGuild(msg.guild, `:hammer: ${client.formatUser(userobj)} was banned from the server`);
			});
		} else {
			msg.reply(`:boot: Banned ${client.formatUser(user)}`)
		}
	})
	.catch((err) => {
		if(err) {
			console.log(err)
			msg.reply(':x: Unable to ban user');
		}
	});
};

exports.description = "Bans the specified user id for the specified reason (optional) [Requires Ban Members permission]";
exports.allowedInDM = false;