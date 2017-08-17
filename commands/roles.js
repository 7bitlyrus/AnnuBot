exports.func = function(client, msg, args) {
	try {
		serverconfig = client.loadGuildConfig(msg.guild);

		if(!args[0]) {
			selfroles = (serverconfig["selfroles"] || "").split(",");

			rolelist = ":scroll: Self-serve roles list:```\n";
			selfroles.forEach((snowflake) => {
				role = msg.guild.roles.find(role => role.id == snowflake);
				if(!role) return;
				rolelist += `${role.id} - ${role.name}\n`;
			});

			msg.reply(`${rolelist}\`\`\`\n\nTo add or remove a role to yourself use \`${client.config.instance.prefix}roles add\` or \`${client.config.instance.prefix}roles remove\`. If you have the Manage Roles permission you can manage these roles with \`${client.config.instance.prefix}roles manage\`.`, {split: true});
			return;
		}

		switch(args[0].toLowerCase()) {
			case "add":
				try {
					args.shift();

					id = resolveRole(msg.guild.roles, args)
					if(!id) {
						msg.reply(":x: Unable to find role on server.")
						break;
					}

					selfroles = (serverconfig["selfroles"] || "").split(",");

					if(selfroles.indexOf(id) == -1) {
						msg.reply(":x: Role is not in self-serve roles list!");
						break;	
					}

					msg.member.addRole(id);
					msg.reply(`:white_check_mark: **${msg.guild.roles.find(role => role.id == id).name}** was given to you.`);
				} catch(e) {
					console.warn(e);
					msg.reply(":x: Unable to grant role.");
				}
				break;

			case "remove":
				try {
					args.shift();

					id = resolveRole(msg.guild.roles, args)
					if(!id) {
						msg.reply(":x: Unable to find role on server.")
						break;
					}

					selfroles = (serverconfig["selfroles"] || "").split(",");

					if(selfroles.indexOf(id) == -1) {
						msg.reply(":x: Role is not in self-serve roles list!");
						break;	
					}

					msg.member.removeRole(id);
					msg.reply(`:white_check_mark: **${msg.guild.roles.find(role => role.id == id).name}** was removed from you.`);
				} catch(e) {
					console.warn(e);
					msg.reply(":x: Unable to remove role.");
				}
				break;

			case "manage":
				if(!(msg.member.hasPermission("MANAGE_ROLES") || msg.author.id == client.config.ownerid)) {
					msg.reply(":x: Access denied.");
					return;
				}

				if(!args[1]) {
					rolelist = ":scroll: List of all roles:```\n";
					msg.guild.roles.reduce((snowflake, role) => {
						if(role.id == role.guild.id) return; // filters out @everyone
						rolelist += `${role.id} - ${role.name}\n`
					}, []);
					msg.reply(`${rolelist}\`\`\`\n\nTo add or remove a role from the self-serve roles list use \`${client.config.instance.prefix}roles manage add\` or \`${client.config.instance.prefix}roles manage remove\`.`, {split: true});
					return;
				}

				switch(args[1].toLowerCase()) {
					case "add":
						try {
							args.splice(0, 2);

							id = resolveRole(msg.guild.roles, args)
							if(!id) {
								msg.reply(":x: Unable to find role on server.");
								break;
							}

							selfroles = (serverconfig["selfroles"] || "").split(",");

							if(selfroles.indexOf(id) != -1) {
								msg.reply(":x: Role is already in self-serve roles list!");
								break;	
							}

							selfroles.push(id);

							serverconfig["selfroles"] = selfroles.toString();
							msg.client.writeGuildConfig(msg.guild, serverconfig);

							msg.reply(`:white_check_mark: **${msg.guild.roles.find(role => role.id == id).name}** was added to the self-serve roles list.`);
						} catch(e) {
							console.warn(e);
							msg.reply(":x: Unable to add role to self-serve roles list.");
						}
					break;

					case "remove":
						try {
							args.splice(0, 2);

							id = resolveRole(msg.guild.roles, args)
							if(!id) {
								msg.reply(":x: Unable to find role on server.");
								break;
							}

							selfroles = (serverconfig["selfroles"] || "").split(",");

							if(selfroles.indexOf(id) == -1) {
								msg.reply(":x: Role is not in self-serve roles list!");
								break;	
							}

							selfroles = selfroles.filter(function(e) { return e !== id });

							serverconfig["selfroles"] = selfroles.toString();
							msg.client.writeGuildConfig(msg.guild, serverconfig);

							msg.reply(`:white_check_mark: **${msg.guild.roles.find(role => role.id == id).name}** was removed from the self-serve roles list.`);
						} catch(e) {
							console.warn(e);
							msg.reply(":x: Unable to remove role to self-serve roles list.");
						}
					break;

					default:
						msg.reply(":x: Invaild argument.");
				};

				break;

			default:
				msg.reply(":x: Invaild argument.")
		}
	} catch(e) {
		console.warn(e);
	}
};

exports.description = "Give or remove self-serve roles from yourself. [Requires Manage Server permission]";
exports.allowedInDM = false;
exports.displayHelp = true;

function resolveRole(roles, args) {
	try {
		if(args[0].match(/^\d+$/)) {
			id = roles.find(role => role.id == args[0]).id;
		} else if(args[0].match(/^<@&(.+)>$/)) {
			id = roles.find(role => role.id == args[0].match(/^<@&(.+)>$/)[1]).id;
		} else {
			id = roles.find(role => role.name.toLowerCase() == args.join(" ").toLowerCase()).id;
		}
		return id;
	} catch(e) {
		return null;
		console.warn(e);
	}
}