const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

client.on('ready', async function () {
  console.log(`${client.user.username} is ready!`)
})

client.login(config.token)
client.setMaxListeners(0)
