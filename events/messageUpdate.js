exports.func = (client, oldMessage, newMessage) => {
	svconf = client.loadGuildConfig(oldMessage.guild);
	if(oldMessage.channel.id == svconf.logs) return;
	if(oldMessage.content == newMessage.content) return; 
	client.logToGuild(oldMessage.guild, `:pencil: ${client.formatUser(oldMessage.author)} message was edited in ${oldMessage.channel}:\n:b: ${oldMessage.cleanContent}\n:a: ${newMessage.cleanContent}`);
};