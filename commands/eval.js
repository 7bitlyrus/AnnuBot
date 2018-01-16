const Command = require('../modules/command')
const inspect = require('util').inspect
const request = require('superagent')

const U_OK_HAND = '\uD83D\uDC4C'
const U_NBSP = '\u200B'
const U_WARNING = '\u26A0'
const R_CODEBLOCK = /```(?:.+\n)?((?:.|\n)+)```/
const S_HASTE_SERVER = 'https://hastebin.com'

class Eval extends Command {
  constructor () {
    super()
    this.ownerOnly = true
  }

  async execute (msg, args) {
    let code = codeblockProcess(args)
    let result
    let emoji

    try {
      result = eval(code) // eslint-disable-line no-eval

      if (!result) return msg.react(U_OK_HAND)
      if (typeof result !== 'string') result = inspect(result)

      emoji = U_OK_HAND
    } catch (e) {
      emoji = U_WARNING
      result = e.toString()
    }

    if (result.length > 1950) {
      let req = await request.post(`${S_HASTE_SERVER}/documents`)
        .send(result)
      msg.reply(`${emoji} Result is lengthy. Uploaded to ${S_HASTE_SERVER}/${req.body.key}`)
    } else msg.reply(clean(`${emoji} ${result}`), { code: 'xl' })
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
