const discord = require('discord.js')
const config  = require('./config.json')

const client = new discord.Client()

client.on('ready', () => {
	if(!config.prefix) config.prefix = `<@${client.user.id}> `
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
