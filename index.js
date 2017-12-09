const discord = require('discord.js')
const fs      = require("fs")
const config  = require('./config.json')

const client = new discord.Client()

client.on('ready', () => {
	if(!config.prefix) config.prefix = `<@${client.user.id}> `

	// TODO: Conflict detector for command name and aliases?
	var commands = new Map();

	fs.readdirSync("./commands").forEach(file => {
		const construct = require(`./commands/${file}`)
		const command   = new construct();

		commands.set(command.constructor.name, command)
		command.aliases.forEach(alias => {
			commands.set(alias, command)
		})
	})
});

client.on('message', (msg) => {
	if(msg.author.id == client.user.id) return
	if(!msg.content.startsWith(config.prefix)) return

	const args = msg.content.slice(config.prefix.length).split(" ");
	const cmd = args.shift()

	msg.reply(`<< DEBUG >>\nargs = ${args}\ncmd  = ${cmd}`, {code: "xl"})
});

client.on('debug', console.log)
client.on('error', console.error)
client.on('warn', console.warn)
client.on('disconnect', console.warn)

client.login(config.token)
