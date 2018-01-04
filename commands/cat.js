const Command = require('../modules/command')
const Discord = require('discord.js')
const request = require('superagent')

class Cat extends Command {
	constructor() {
		super()
		this.description = 'Shows a random cat photo'
		this.usage.text  = 'Powered by random.cat.'
	}
	
	async execute(msg, args) {
		msg.channel.startTyping()

		let req = await request.get('http://random.cat/meow')
		let url = JSON.parse(req.res.text).file

		req     = await request.get(url)
		let img = new Discord.Attachment(req.body)

		msg.channel.stopTyping()
		msg.reply(img)
	}
}

module.exports = Cat