class Command {
  constructor () {
    this.aliases = []
    this.disableDMs = false
    this.description = undefined
    this.usage = {args: undefined, text: undefined}
  }
}

module.exports = Command
