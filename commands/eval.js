const Command = require('../modules/command')
const inspect = require('util').inspect

const U_OK_HAND = '\uD83D\uDC4C'
const U_NBSP = '\u200B'
const U_WARNING = '\u26A0'
const R_CODEBLOCK = /```(?:.+\n)?((?:.|\n)+)```/

class Eval extends Command {
  constructor () {
    super()
    this.ownerOnly = true
  }

  async execute (msg, args) {
    let code = codeblockProcess(args)
    let result

    try {
      result = eval(code) // eslint-disable-line no-eval

      if (!result) return msg.react(U_OK_HAND)
      if (typeof result !== 'string') result = inspect(result)

      result = `${U_OK_HAND} ${result}`
    } catch (e) {
      result = `${U_WARNING} ${e}`
    }

    msg.reply(clean(result), { code: 'xl', split: true })
  }
}

module.exports = Eval

function clean (text) {
  if (typeof text === 'string') {
    return text
      .replace(/`/g, `\`${U_NBSP}`)
      .replace(/@/g, `@${U_NBSP}`)
  } else return text
}

function codeblockProcess (args) {
  let string = args.join(' ')
  let matches = R_CODEBLOCK.exec(string)
  return matches ? matches[1] : string
}
