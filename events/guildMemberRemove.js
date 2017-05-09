exports.func = (client, member) => {
	client.logToGuild(member.guild, `:outbox_tray: ${client.formatUser(member.user)} left the server`);
};