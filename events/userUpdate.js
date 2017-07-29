exports.func = (client, oldUser, newUser) => {
	if(oldUser.tag != newUser.tag) {
		client.guilds.reduce((list, guild) => {
			guild.fetchMember(newUser)
				.then((user) => {
					client.logToGuild(guild, `:pen_ballpoint: ${client.formatUser(newUser)} tag was changed from \`${oldUser.tag}\` to \`${newUser.tag}\``);
			}).catch((err) => { return; });
		}, []);
	}
};