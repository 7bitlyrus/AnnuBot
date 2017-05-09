var timehaze = require('timehaze');

exports.func = (client, member) => {
	serverconfig = client.loadGuildConfig(member.guild);
	delta = timehaze.delta(member.user.createdAt, new Date());
	client.logToGuild(member.guild, `:inbox_tray: ${client.formatUser(member.user)} joined the server (Account created ${delta.ago()})`);
};