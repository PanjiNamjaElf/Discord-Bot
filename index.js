const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const command = require('./commands/command')
const message = require('./components/message')
const privateMessage = require('./components/private-message')

client.on('ready', function () {
  console.log(`${client.user.username} is ready!`)

  command(client, 'ping', (message) => {
    message.channel.send('Pong!')
  })

  command(client, 'servers', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })

  command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  command(client, 'status', (message) => {
    const content = message.content.replace('!status ', '')

    client.user.setPresence({
      activity: {
        name: content,
        type: 'WATCHING',
      },
    })
  })

  privateMessage(client, 'ping', 'Pong!')

  client.users.fetch('650311336085159947').then((user) => {
    user.send('Hello Captain!')
  })
})

client.login(config.token)
