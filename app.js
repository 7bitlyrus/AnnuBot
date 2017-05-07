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

client.login(config.token);