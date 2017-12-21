const commandBase = require('../modules/commandBase');

module.exports = class prefix extends commandBase {
	constructor() {
		super()
		this.disableDMs = "Prefixes are not used in direct messages."
	}
	execute(msg, args) {
		msg.reply('wip command')
		if(!args[0]) {
			msg.reply('The prefix for this server is ...')
		} else if(msg.member.hasPermission('MANAGE_GUILD')) {
			msg.reply('Token set to ...')
		} else {
			msg.reply('You do not have permission to set the token for this server.')
		}
	}
}
