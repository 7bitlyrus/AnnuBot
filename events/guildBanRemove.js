exports.func = (client, guild, user) => {
	client.logToGuild(guild, `:eye_in_speech_bubble: ${client.formatUser(user)} was unbanned from the server`);
};