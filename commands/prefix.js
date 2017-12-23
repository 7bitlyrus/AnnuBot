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

			let doc = await db.ensureIDExists(msg.guild.id)

			if(doc.prefix == args[0]) return msg.reply(`This server's prefix is already \`${doc.prefix}\`!`)

			let numReplaced = await db.update({_id: doc._id}, {$set:{prefix: args[0]}})
			let newDoc      = await db.ensureIDExists(msg.guild.id)

			msg.reply(`This server's prefix is now \`${newDoc.prefix}\`.`)

		} else {
			msg.reply('You do not have permission to set the prefix for this server.')
		}

	}
}
