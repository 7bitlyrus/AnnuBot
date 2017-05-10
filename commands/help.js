var fs = require('fs');
var rightPad  = require('right-pad');

exports.func = function(client, msg, args) {
	try {
		fs.readdir("./commands/", (err, files) => {
			var indexed = [];

			files.forEach(file => {
				indexed.push(file.slice(0, -3)); 
			});

			var text = "\`\`\`"
			indexed.forEach(cmd => {
				cmdhelp = require(`./${cmd}.js`).description;
				text += `\n${client.config.instance.prefix}${rightPad(cmd, 16, " ")} - ${cmdhelp}`
			});
			text += "\`\`\`"

			msg.author.send(text).then(() => {
				if(msg.channel.type !== "dm") {
					msg.reply(`:mailbox_with_mail: Check your DMs`)
				}
			});
		});
	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Messages help on commands to the requester.";
exports.allowedInDM = true;