exports.func = (client, guild, user) => {
	client.fetchUser(user.id, true)
		.then(() => {
			client.logToGuild(guild, `:hammer: ${client.formatUser(user)} was banned from the server`)
		});
};