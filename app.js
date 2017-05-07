const discord = require('discord.js');
const fs      = require('fs');
const yaml    = require('js-yaml');

const client = new discord.Client({
	fetchAllMembers: true,
	messageCacheMaxSize: 100000
});

if (fs.existsSync('./config.yml')) {
	var config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
} else {
	throw new Error("config.yml does not exist! Check README.md for a config template.")
}

client.on('message', (msg) => {
	if(msg.author.id == client.user.id) return;
	if(!msg.content.startsWith(config.prefix)) return;

	if(message.channel.type == "dm" && !message.author.bot) {
		message.reply(":x: This bot cannot be used in DMs!");
	}

	const args = msg.content.split(" ");
	const cmd = args.shift().slice(config.prefix.length);

	try {
		require("./cmds/" + cmd).func(client, msg, args, config);
	} catch(e) {
		console.warn(e);
	}
});

client.on('debug', console.log);
client.on('error', console.error);
client.on('warn', console.warn);
client.on('disconnect', console.warn);

client.login(config.token);