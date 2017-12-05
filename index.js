const discord = require('discord.js');
const config  = require('./config.json');

const client = new discord.Client();

client.on('ready', () => {

});

client.on('message', (msg) => {
	console.log(msg)
});

client.on('debug', console.log);
client.on('error', console.error);
client.on('warn', console.warn);
client.on('disconnect', console.warn);

client.login(config.token);
