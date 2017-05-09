exports.func = (client, oldUser, newUser) => {
	if(!(oldUser.tag == newUser.tag)) {
		client.guilds.reduce((list, guild) => {
			guild.fetchMember(newUser)
				.then((user) => {
					client.logToGuild(guild, `:pen_ballpoint: ${client.formatUser(oldUser)} Tag was changed to \`${newUser.tag}\``);
			}).catch((err) => { return; });
		}, []);
	}
};