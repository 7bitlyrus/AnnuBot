exports.func = function(client, msg, args) {
	try {
		serverconfig = client.loadGuildConfig(msg.guild);

		if(!args[0]) {
			// TODO
			msg.reply(`:scroll: Allowed roles list:\n--list of allowed roles here--\n\nTo add or remove a role to yourself use \`${client.config.instance.prefix}roles add\` or \`${client.config.instance.prefix}roles remove\`. If you have the Manage Roles permission you can manage these roles with \`${client.config.instance.prefix}roles manage\`.`, {split: true});
			return;
		}

		switch(args[0].toLowerCase()) {
			case "add":
				// TODO

			case "remove":
				// TODO

			case "manage":
				if(!(msg.member.hasPermission("MANAGE_ROLES") || msg.author.id == client.config.ownerid)) {
					msg.reply(":x: Access denied.");
					return;
				}

				if(!args[1]) {
					rolelist = ":scroll: Roles list:\n";
					msg.guild.roles.reduce((snowflake, role) => {
						if(role.id == role.guild.id) return; // filters out @everyone
						rolelist += `${role.name} (\`${role.id}\`)\n`
					}, []);
					msg.reply(`${rolelist}\n\nTo add or remove a role from the allowed roles list use \`${client.config.instance.prefix}roles manage add\` or \`${client.config.instance.prefix}roles manage remove\`.`, {split: true});
					return;
				}

				switch(args[1].toLowerCase()) {
					case "add":
						// TODO
					break;

					case "remove":
						// TODO
					break;

					default:
						msg.reply(":x: Invaild argument.");
				};

			default:
				msg.reply(":x: Invaild argument.")
		}
	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Give or remove allowed roles from yourself. [Requires Manage Server permission]";
exports.allowedInDM = false;
exports.displayHelp = true;