const commandBase = require('../modules/commandBase')
const discord     = require('discord.js')

module.exports = class ping extends commandBase {
	constructor() {
		super()
		this.aliases = ['pong']
		this.description = 'Returns latency information'
	}

	async execute(msg) {
		let embed = new discord.RichEmbed()
		.setTitle('Pong!')
		.addField('Heartbeat', `${Math.round(msg.client.ping)}ms`, true)
		.addField('Heartbeat History', `${msg.client.pings.join('ms, ')}ms`, true)
		.addField('Roundtrip', '\u200B', true)

		let m = await msg.channel.send('', embed)

		embed.fields[2] = {name: 'Roundtrip', value: `${m.createdTimestamp - msg.createdTimestamp}ms`, inline: true}
		m.edit('', embed).catch(console.warn)
	}
}
