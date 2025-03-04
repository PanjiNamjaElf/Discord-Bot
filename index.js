const path = require('path')
const fs = require('fs')

const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const antiAd = require('./components/anti-ad')
const inviteNotifications = require('./components/invite-notifications')

client.on('ready', async function () {
  console.log(`${client.user.username} is ready!`)

  antiAd(client)
  inviteNotifications(client)

  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = dir => {
    const files = fs.readdirSync(path.join(__dirname, dir))

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))

      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))

        commandBase(client, option)
      }
    }
  }

  readCommands('commands')
})

client.login(config.token)
client.setMaxListeners(0)
