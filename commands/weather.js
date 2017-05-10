var snekfetch = require('snekfetch');

exports.func = function(client, msg, args) {
	try {
		if(!args[0]) {
			msg.reply(":x: Missing argument.")
			return;
		}
		if(!args.join("+").match(/^[0-9A-Za-z+]+$/)) {
			msg.reply(":x: Invaild argument! Alphanumeric and spaces only.")
			return;
		}

		snekfetch.get(`http:\/\/wttr.in\/~${args.join("+")}_0tpQ.png`)
		.then(r => {
			msg.reply({file: {attachment: r.body}})
		})
		.catch((err) => {
			if(err) {
				console.log(err)
			}
		});

	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Displays weather details for the specified location. Powered by wttr.in";
exports.allowedInDM = true;