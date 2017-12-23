const commandBase = require('../modules/commandBase')

module.exports = class prefix extends commandBase {
	constructor() {
		super()
		this.disableDMs = "Prefixes are not used in direct messages."
	}
	async execute(msg, args) {
		let db = msg.client.db

		if(!args[0]) {
			let doc = await db.ensureIDExists(msg.guild.id)
			msg.reply(doc.prefix ?
				`This server's prefix is \`${doc.prefix}\`.` : 'This server does not have a prefix defined.')
		} else if(msg.member.hasPermission('MANAGE_GUILD')) {
			msg.reply('Not implemented.')
		} else {
			msg.reply('You do not have permission to set the token for this server.')
		}

	}
}
