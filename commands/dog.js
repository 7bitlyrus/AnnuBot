const commandBase = require('../modules/commandBase')
const request     = require('superagent');
const Discord     = require('discord.js')

module.exports = class dog extends commandBase {
	constructor() {
		super()
		this.description = 'Shows a random dog photo'
		this.usage.text  = 'Powered by random.dog.'
	}
	async execute(msg, args) {
		msg.channel.startTyping()

		let req = await request.get('https://random.dog/woof.json?filter=gif,mp4')
		let url = JSON.parse(req.res.text).url

		req     = await request.get(url)
		let img = new Discord.Attachment(req.body)
		
		msg.channel.stopTyping()
		msg.reply(img)
	}
}