const commandBase = require('../modules/commandBase');

module.exports = class prefix extends commandBase {
	constructor() {
		super()
		this.disableDMs = true
	}
	execute(msg) {
		msg.reply("bar")
	}
}
