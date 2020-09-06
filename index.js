const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const command = require('./commands/command')
const message = require('./components/message')
const privateMessage = require('./components/private-message')
const roleClaim = require('./components/role-claim')

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

  command(client, 'embed', (message) => {
    const logo = 'https://cdn.weeb.sh/images/rJgTQ1tvb.gif'

    const embed = new Discord.MessageEmbed()
      .setTitle('Example text embed')
      .setURL('https://cdn.weeb.sh/images/rJgTQ1tvb.gif')
      .setAuthor(message.author.username)
      .setImage(logo)
      .setThumbnail(logo)
      .setFooter('This is a footer', logo)
      .setColor('#00AAFF')
      .addFields(
        {
          name: 'Field 1',
          value: 'Hello Captain!',
          inline: true,
        },
        {
          name: 'Field 2',
          value: 'Hello Captain!',
          inline: true,
        },
        {
          name: 'Field 3',
          value: 'Hello Captain!',
          inline: true,
        },
        {
          name: 'Field 4',
          value: 'Hello Captain!',
        }
      )

    message.channel.send(embed)
  })

  command(client, 'serverinfo', (message) => {
    const { guild } = message

    const { name, region, memberCount, owner, afkTimeout } = guild
    const icon = guild.iconURL()

    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for "${name}"`)
      .setThumbnail(icon)
      .addFields(
        {
          name: 'Region',
          value: region,
        },
        {
          name: 'Members',
          value: memberCount,
        },
        {
          name: 'Owner',
          value: owner.user.tag,
        },
        {
          name: 'AFK Timeout',
          value: afkTimeout / 60,
        },
      )

    message.channel.send(embed)
  })
})

client.login(config.token)
