const packagejson = require('../package.json');
const timehaze = require('timehaze');

exports.func = function(client, msg, args) {
	try {
		// If you want to edit the details of your instance, use config.yml
		const owner = client.users.get(client.config.instance.ownerid.toString());
		delta = timehaze.delta(new Date(new Date() - client.uptime), new Date());

		var embedData = {
			"embed": {
				"title": "Annu Bot",
				"description": "Written by [Ian Murray#5251](http://github.com/ianmurray)",
				"footer": {
					"text": `Version ${packagejson.version} | Started ${delta.ago()}.`
				},
				"fields": [
					{
						"name": "Instance Owner",
						"value": owner.tag,
					},
					{
						"name": "Instance Details",
						"value": client.config.instance.details,
					}
				]
			}
		}

		if(client.config.instance.public) {
			client.generateInvite(8).then(link => {
				embedData.embed.fields.push({
					"name": "Invite Link",
					"value": `[Invite this bot.](${link})`,
				});

				msg.channel.send("", embedData)
			});
		} else {
			msg.channel.send("", embedData)
		}

	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Returns information about this bot instance.";
exports.allowedInDM = true;
exports.displayHelp = true;