exports.func = function(client, msg, args) {
	msg.reply(`This command has been removed. Use \`${client.config.instance.prefix}log\`.`);
};

exports.description = null;
exports.allowedInDM = false;
exports.displayHelp = false;