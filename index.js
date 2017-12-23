const discord = require('discord.js')
const fs      = require('fs')
const db      = require('./modules/database.js')
const config   = require('./config.json')

const client = new discord.Client()
client.config = config
client.db = db
client.commands = new Map();


client.on('ready', () => {
	delete client.config.token

	// TODO: Conflict detector for command name and aliases?
	fs.readdirSync('./commands').forEach(file => {
		const construct = require(`./commands/${file}`)
		const command   = new construct();

		client.commands.set(command.constructor.name, command)
		command.aliases.forEach(alias => {
			client.commands.set(alias, command)
		})
	})
})

client.on('message', async function(msg) {
	if(msg.author.id == client.user.id) return

	let prefix = `<@${client.user.id}> `            // Prefix defaults to our mention.

	if(msg.channel.type == 'dm') prefix = ''        // Prefixes arn't used in DMs.
	else if(msg.content.startsWith(prefix)) void(0) // If it starts with our mention, don't use server prefix.
	else {
		doc = await db.ensureIDExists(msg.guild.id)
		if(doc.prefix) prefix = doc.prefix
	}

	if(!msg.content.startsWith(prefix)) return

	const args = msg.content.slice(prefix.length).split(" ");
	const cmd = args.shift()

	const command = client.commands.get(cmd)
	if(!command) return

	if(command.disableDMs && msg.channel.type == 'dm') {
		msg.reply(typeof command.disableDMs === 'string' ?
			command.disableDMs : "This command is disabled in direct messages.")
		return
	}

	try {
		command.execute(msg, args);
	} catch(e) {
		console.warn(e)
		msg.reply(`An error occurred.`)
	}
})

client.on('debug', console.log)
client.on('error', console.error)
client.on('warn', console.warn)
client.on('disconnect', console.warn)

client.login(client.config.token)
