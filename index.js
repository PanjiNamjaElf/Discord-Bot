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

  command(client, 'CreateTextChannel', (message) => {
    const name = message.content.replace('!CreateTextChannel', '')

    message.guild.channels
      .create(name, {
        type: 'text',
      })
      .then((channel) => {
        const categoryId = '745311804468494426'

        channel.setParent(categoryId)
      })
  })

  command(client, 'CreateVoiceChannel', (message) => {
    const name = message.content.replace('!CreateVoiceChannel', '')

    message.guild.channels
      .create(name, {
        type: 'voice',
      })
      .then((channel) => {
        const categoryId = '745311804468494426'

        channel.setParent(categoryId)
        channel.setUserLimit(10)
      })
  })
})

client.login(config.token)
