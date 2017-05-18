exports.func = function(client, msg, args) {
		if(!(msg.author.id == client.config.instance.ownerid)) {
			msg.reply(":x: Access denied.");
			return;
		}
	try {
		const code = args.join(' ');
		result = eval(code);

		if (typeof result !== 'string') {
        	result = require('util').inspect(result);
		}

		msg.reply(clean(result), {code:'xl'})
	} catch(e) {
		msg.reply(`:interrobang: Error.\`\`\`xl\n${clean(e)}\`\`\``);
	}
};

function clean(text) {
	if (typeof(text) === 'string') {
		return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	} else {
		return text;
	}
}

exports.description = "Evaluates JavaScript code. [Bot owner only]";
exports.allowedInDM = true;