exports.func = function(client, msg, args) {
	try {
		if(!(msg.author.id == client.config.instance.ownerid)) {
			msg.reply(":x: Access denied.")
			return;
		}
		if(!args[0]) {
			msg.reply(":x: Missing argument.")
			return;
		}

		client.guilds.get(args[0]).leave()
			.then(g => msg.reply(`:put_litter_in_its_place:  Left ${g}`))
			.catch(e => console.warn(e));
		return;
	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Leaves the specified server by id. [Owner only]";
exports.allowedInDM = true;
exports.displayHelp = false;