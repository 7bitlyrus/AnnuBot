const Command = require('../modules/command')
const Discord = require('discord.js')

class Ping extends Command {
	constructor() {
		super()
		this.aliases     = ['pong']
		this.description = 'Returns latency information'
	}

	async execute(msg) {
		let embed = new Discord.RichEmbed()
		.setTitle('Pong!')
		.addField('Heartbeat', `${Math.round(msg.client.ping)}ms`, true)
		.addField('Heartbeat History', `${msg.client.pings.join('ms, ')}ms`, true)
		.addField('Roundtrip', '\u200B', true)

		let m = await msg.channel.send('', embed)

		embed.fields[2] = {name: 'Roundtrip', value: `${m.createdTimestamp - msg.createdTimestamp}ms`, inline: true}
		m.edit('', embed)
	}
}

module.exports = Ping