const discord = require('discord.js')
const fs      = require('fs')
const db      = require(`./modules/database.js`)

const client = new discord.Client()
client.config   = require('./config.json')
client.commands = new Map();

client.on('ready', () => {
	if(!client.config.prefix) client.config.prefix = `<@${client.user.id}> `
	delete client.config.token

	// TODO: Conflict detector for command name and aliases?
	fs.readdirSync("./commands").forEach(file => {
		const construct = require(`./commands/${file}`)
		const command   = new construct();

		client.commands.set(command.constructor.name, command)
		command.aliases.forEach(alias => {
			client.commands.set(alias, command)
		})
	})
});

client.on('message', (msg) => {
	if(msg.author.id == client.user.id) return
	if(!msg.content.startsWith(client.config.prefix)) return

	const args = msg.content.slice(client.config.prefix.length).split(" ");
	const cmd = args.shift()

	try {
		client.commands.get(cmd).execute(msg, args);
	} catch(e) {
		console.warn(e)
		msg.reply(":exclamation: An unknown error occurred.")
	}
});

client.on('debug', console.log)
client.on('error', console.error)
client.on('warn', console.warn)
client.on('disconnect', console.warn)

client.login(client.config.token)
