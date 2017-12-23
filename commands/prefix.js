const commandBase = require('../modules/commandBase')

module.exports = class prefix extends commandBase {
	constructor() {
		super()
		this.disableDMs  = 'Prefixes are not used in direct messages.'
		this.description = 'Views or sets a servers\'s prefix'
		this.usage.args  = '[new prefix]'
		this.usage.text  = 'If a new prefix is not specifed, returns the server\'s current prefix. Otherwise, sets ' +
			'the server\'s new prefix. (Requires MANAGE_GUILD permission.)'
	}
	async execute(msg, args) {
		let db = msg.client.db

		if(!args[0]) {
			let doc = await db.ensureIDExists(msg.guild.id)
			msg.reply(doc.prefix ?
				`This server's prefix is \`${doc.prefix}\`.` : 'This server does not have a prefix defined.')

		} else if(msg.member.hasPermission('MANAGE_GUILD')) {
			let doc = await db.ensureIDExists(msg.guild.id)
			if(doc.prefix == args[0]) return msg.reply(`This server's prefix is already \`${doc.prefix}\`!`)

			await db.update({_id: doc._id}, {$set:{prefix: args[0]}})
			let newDoc      = await db.ensureIDExists(msg.guild.id)

			msg.reply(`This server's prefix is now \`${newDoc.prefix}\`.`)

		} else {
			msg.reply('You do not have permission to set the prefix for this server.')
		}

	}
}
