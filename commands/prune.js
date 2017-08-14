exports.func = function(client, msg, args) {
	if(!(msg.member.hasPermission("MANAGE_MESSAGES") || msg.author.id == client.config.instance.ownerid)) {
		msg.reply(":x: Access denied.");
		return;
	}

	if(!args[0]) {
		msg.reply(":x: Missing argument.");
		return;
	}

	if(!args[0].match(/^\d+$/)) {
		msg.reply(":x: Invaild number.");
		return;
	}

	if(args[0] >= 100) {
		msg.reply(":x: Messages should be less then 100.");
		return;
	}

	msg.channel.bulkDelete(Number(args[0]) + 1, true).then((msgs) => { // Extra message forcommand.
		msg.reply(msgs.size == 2 ? "**1** message pruned." : `**${msgs.size-1}** messages pruned.`);
	}).catch((e) => {
		msg.reply(":x: An error occurred.");
	})


	
};

exports.description = "Prunes messages from channel. [Requires Manage Messages permission]";
exports.allowedInDM = false;
exports.displayHelp = true;