exports.func = function(client, msg, args) {
	try {
		serverconfig = client.loadGuildConfig(msg.guild);

		if(!args[0]) {
			msg.reply("No user specifed!");
			return;
		}

		id = resolveUser(msg.guild.members, args)

		console.log(id)
		if(!id) {
			msg.reply("Unable to resolve user.")
			return;
		}

		client.fetchUser(id).then(u => { 
			msg.reply(u.displayAvatarURL)
		}).catch((e) => {
			console.warn(e);
			msg.reply("An unknown error occurred.")
		});
	} catch(e) {
		console.warn(e);
		msg.reply("An unknown error occurred.")
	}
};

exports.description = "Returns the avatar of the user specified.";
exports.allowedInDM = true;
exports.displayHelp = true;

function resolveUser(members, args) {
	try {
		if(args[0].match(/^\d+$/)) {
			console.log("id?")
			id = members.find(member => member.user.id == args[0]).id;
		} else if(args[0].match(/^<@(\d+)>$/)) {
			console.log("mention?")
			id = members.find(member => member.user.id == args[0].match(/^<@(\d+)>$/)[1]).id;
		} else {
			console.log("username?")
			id = members.find(member => member.user.username.toLowerCase() == args.join(" ").toLowerCase()).id;
		}
		return id;
	} catch(e) {
		return null;
		console.warn(e);
	}
}