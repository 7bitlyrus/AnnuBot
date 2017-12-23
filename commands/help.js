const commandBase = require('../modules/commandBase')

module.exports = class help extends commandBase {
	constructor() {
		super()
		this.aliases     = ['?']
		this.description = 'Shows a list of help channels'
		this.usage.args  = '[command]'
		this.usage.text  = 'If command is not specified, returns a list of commands. Otherwise, shows usage for the ' +
			'given command.'
	}

	execute(msg, args) {
		let commands = msg.client.commands

		if(!args[0]) {
			let lines  = []
			let cmds   = []
			let maxLen = [0, 0]

			for (let [key, command] of commands) {
				if(key != command.constructor.name) continue
				if(!command.description) continue

				let name = command.constructor.name
				let desc = command.description

				cmds.push([name, desc])
				if(name.length > maxLen[0]) maxLen[0] = name.length
				if(desc.length > maxLen[1]) maxLen[1] = desc.length
			}

			cmds.forEach((arr) => {
				let paddedName = rightPad(arr[0], maxLen[0])
				let paddedDesc = rightPad(arr[1], maxLen[1])
				lines.push(`[${paddedName}](${paddedDesc})`)
			})

			lines.push('', '# Type help <command> for usage on a command.')

			let text = lines.join("\n")

			msg.author.send(text, {code: 'md'}).then(() => {
				if(msg.channel.type !== 'dm') msg.reply('Check your DMs!')
			}).catch(() => {
				if(msg.channel.type !== 'dm') msg.reply('Unable to send you a DM, is your DMs open?')
			})
		} else {
			if(!commands.get(args[0])) return msg.reply('Command not found.')

			let command = commands.get(args[0])
			let aliases = [command.constructor.name, ...command.aliases]

			let text = []
			text[0] = aliases.length > 1  ? `{${aliases.join(",")}}`    : aliases[0]
			text[1] = command.usage.args  ? ` ${command.usage.args}`    : ''
			text[2] = command.description ? ` - ${command.description}` : ''
			text[3] = command.usage.text  ? `\n\n${command.usage.text}` : ''

			msg.channel.send(text.join(''), {code: true})
		}
	}
}
		
function rightPad(str, len, char) {
	var i = -1
	len = len - str.length
	if (!char && char !== 0) char = ' '
	while (++i < len) str += char;
	return str
}