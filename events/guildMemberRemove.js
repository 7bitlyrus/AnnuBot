exports.func = (client, member) => {
	serverconfig = client.loadGuildConfig(member.guild);
	client.logToGuild(member.guild, `:outbox_tray: ${client.formatUser(member.user)} left the server`);
};