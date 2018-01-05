const Command = require('../modules/command')
const Discord = require('discord.js')
const request = require('superagent')

class Cat extends Command {
  constructor () {
    super()
    this.description = 'Shows a random cat photo'
    this.usage.text = 'Powered by random.cat.'
  }

  async execute (msg) {
    factory(msg, 'http://random.cat/meow', 'file')
  }
}

class Dog extends Command {
  constructor () {
    super()
    this.description = 'Shows a random dog photo'
    this.usage.text = 'Powered by random.dog.'
  }

  async execute (msg, args) {
    factory(msg, 'https://random.dog/woof.json?filter=gif,mp4', 'url')
  }
}

module.exports = [Cat, Dog]

async function factory (msg, endpoint, key) {
  msg.channel.startTyping()

  let req = await request.get(endpoint)
  let url = JSON.parse(req.res.text)[key]

  req = await request.get(url)
  let img = new Discord.Attachment(req.body)

  msg.channel.stopTyping()
  msg.reply(img)
}
