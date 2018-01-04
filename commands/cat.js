const commandBase = require('../modules/commandBase')
const request     = require('superagent')
const Discord     = require('discord.js')

module.exports = class cat extends commandBase {
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