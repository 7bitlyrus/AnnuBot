const commandBase  = require('../modules/commandBase')
const Help = require('./help')
const help = new Help();  

module.exports = class prune extends commandBase {
	constructor() {
		super()
		this.disableDMs  = 'You cannot prune messages in DMs.'
		this.description = 'Prunes messages from a channel'
		this.usage.args  = '<count>'
		this.usage.text  = 'Prunes <count> messages from the channel, not including the commanding ' + 
			'message. Count must be between 2 and 100, inclusive. Messages older then 2 weeks cannot be pruned ' +
			'automatically. MANAGE_MESSAGES permission is required to prune messages.'
	}
	async execute(msg, args) {
		if(!msg.member.hasPermission('MANAGE_MESSAGES')) {
			return msg.reply('You do not have permission to prune messages.')
		}

		let num = args[0]
		
		if(!num) return msg.reply(help._returnUsage(msg.client, 'prune'), {code: true})
		if(isNaN(num)) return msg.reply('Invaild number.')
		if(num > 100 || num < 2) return msg.reply('Between 2 and 100 messages can be pruned at once.')

		await msg.delete().then(async function() {
			let final = await msg.channel.bulkDelete(num).catch(console.error)
			let count = final.size

			msg.reply(`${count} message${count == 1 ? '' : 's'} were deleted.`)
		}).catch(e => {
			console.log(e)
			return msg.reply("An error occurred. Missing permissions?")
		});
	}
}
