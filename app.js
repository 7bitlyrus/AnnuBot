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

	const args = msg.content.split(" ");
	const cmd = args.shift().slice(config.prefix.length);

	const cmdscript = require("./cmds/" + cmd);

	if(msg.channel.type == "dm" && !msg.author.bot && !cmdscript.allowedInDM) {
		msg.reply(":x: This command is not allowed in DMs!");
		return;
	}

	try {
		cmdscript.func(client, msg, args, config);
	} catch(e) {
		console.warn(e);
	}
});

client.on('debug', console.log);
client.on('error', console.error);
client.on('warn', console.warn);
client.on('disconnect', console.warn);

client.login(config.token);