const channelId = '752064243729301624'
const checkMark = '✅'

let registered = false

const registerEvent = client => {
  if (registered) {
    return
  }

  registered = true

  console.log('Registering Event...')

  client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) {
      return
    }

    console.log('Handling reaction...')

    const { message } = reaction

    if (message.channel.id === channelId) {
      message.delete()
    }
  })
}

module.exports = {
  commands: ['ticket', 'support'],
  minArgs: 1,
  expectedArgs: '<message>',
  callback: (userMessage, arguments, text, client) => {
    const { guild, member } = userMessage

    registerEvent(client)

    const channel = guild.channels.cache.get(channelId)

    channel.send(`A new ticket has been created by <@${member.id}>
    
    "${text}"
    
    Click the ${checkMark} icon when this issue has been resolved.
    `).then((ticketMessage) => {
      ticketMessage.react(checkMark)
      userMessage.reply('Your ticket has been sent!')
    })
  }
}
