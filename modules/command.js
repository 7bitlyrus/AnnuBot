class Command {
  constructor () {
    this.aliases = []
    this.disableDMs = false
    this.description = undefined
    this.usage = {args: undefined, text: undefined}
    this.ownerOnly = false
  }
}

module.exports = Command
