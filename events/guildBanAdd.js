exports.func = (client, guild, user) => {
	client.logToGuild(guild, `:hammer: ${client.formatUser(user)} was banned from the server`)
};