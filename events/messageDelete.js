exports.func = (client, message) => {
	svconf = client.loadGuildConfig(message.guild);
	if(message.channel.id == svconf.instance.logs) return;
	client.logToGuild(message.guild, `:wastebasket: ${client.formatUser(message.author)} message was deleted in ${message.channel}:\n${message.cleanContent}`);
};