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

client.on('ready', () => {
	client.config = config

	client.loadGuildConfig = function(guild) {
		if (!fs.existsSync(`./svconf/${guild.id}.yml`)) {
			fs.closeSync(fs.openSync(`./svconf/${guild.id}.yml`, 'w'));
		}
		return yaml.safeLoad(fs.readFileSync(`./svconf/${guild.id}.yml`, 'utf8'));
	}

	client.writeGuildConfig = function(guild, config) {
		if (!fs.existsSync(`./svconf/${guild.id}.yml`)) {
			fs.closeSync(fs.openSync(`./svconf/${guild.id}.yml`, 'w'));
		}
		fs.writeFileSync(`./svconf/${guild.id}.yml`, yaml.safeDump(config), 'utf8')
		return true
	}

	fs.readdir("./events/", (err, files) => {
		var indexed = [];

		files.forEach(file => {
			indexed.push(file.slice(0, -3));
		});

		indexed.forEach(event => {
			client.on(event, (...args) => require(`./events/${event}`).func(client, ...args));
		});
	});
});

client.on('message', (msg) => {
	if(msg.author.id == client.user.id) return;
	if(!msg.content.startsWith(config.prefix)) return;

	const args = msg.content.split(" ");
	const cmd = args.shift().slice(config.prefix.length);

	try {
		cmdscript = require(`./commands/${cmd}`);
	} catch(e) {
		console.warn(e);
		return;
	}

	if(msg.channel.type == "dm" && !msg.author.bot && !cmdscript.allowedInDM) {
		msg.reply(":x: This command is not allowed in DMs!");
		return;
	}

	cmdscript.func(client, msg, args);
});

client.on('debug', console.log);
client.on('error', console.error);
client.on('warn', console.warn);
client.on('disconnect', console.warn);

client.login(config.token);