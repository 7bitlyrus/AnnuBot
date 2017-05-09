const packagejson = require('../package.json');

exports.func = function(client, msg, args) {
	try {
		// If you want to edit the details of your instance, use config.yml's instanceinfo
		const owner = client.users.get(client.config.ownerid.toString());
		text  = "\`\`\`md\n"
		text += "# About this software\n"
		text += "> Annu Bot " + packagejson.version + " by Ian Murray#5251 <http:\/\/github.com\/ianmurray>\n\n"
		text += "# About this instance\n"
		text += "> " + client.user.tag + " owned by " + owner.tag + "\n"
		text += client.config.instanceinfo + "\`\`\`"
		msg.channel.send(text)
	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Returns information about this bot instance.";
exports.allowedInDM = true;