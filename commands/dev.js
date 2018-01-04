const Command = require('../modules/command')

class Dev extends Command {
	constructor() {
		super()
		this.aliases = ['debug', 'd']
	}

	async execute(msg, args) {
		if(msg.author.id !== msg.client.appInfo.owner.id) return msg.reply(`Only the bot owner can use this command.`)

		switch(args[0]) {
			case "eval":
			case "e":
				args.shift()
				console.log(arg.join(" "))
			break;
		}
	}
}

module.exports = Dev