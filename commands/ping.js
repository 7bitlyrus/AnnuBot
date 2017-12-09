var commandBase = require("../modules/commandBase");

module.exports = class ping extends commandBase {
	constructor() {
		super()
		this.aliases = ["pang", "peng", "pong", "pung"]
	}
}