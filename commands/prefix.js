const commandBase = require('../modules/commandBase')

module.exports = class prefix extends commandBase {
	constructor() {
		super()
		this.disableDMs  = 'Prefixes are not used in direct messages.'
		this.description = 'Views or sets a servers\'s prefix'
		this.usage.args  = '[new prefix,\'disable\']'
		this.usage.text  = 'If no argument is specified, the server\'s current prefix is returned. If a string that ' +
			'is not \'disable\', it will be set as the new prefix. If \'disable\' is specifed, the server\'s prefix ' +
			'will be disabled. \n\nMANAGE_GUILD permission is required to modify a server\'s prefix.'
	}
	async execute(msg, args) {
		let db = msg.client.db

		if(!args[0]) {
			let doc = await db.ensureIDExists(msg.guild.id)
			msg.reply(doc.prefix ?
				`This server's prefix is \`${doc.prefix}\`.` : 'This server does not have a prefix.')

		} else if(msg.member.hasPermission('MANAGE_GUILD')) {
			let prefix = args[0] == 'disable' ? undefined : args[0];
			let doc = await db.ensureIDExists(msg.guild.id)

			if(doc.prefix == prefix) return msg.reply("This server's prefix has not been modifed.")
			await db.update({_id: doc._id}, {$set: {prefix: prefix}})

			let newDoc = await db.ensureIDExists(msg.guild.id)

			msg.reply(newDoc.prefix ?
				`This server's prefix is now \`${newDoc.prefix}\`.` : 'This server no longer has a prefix.')
		} else {
			msg.reply('You do not have permission to modify the prefix for this server.')
		}

	}
}
