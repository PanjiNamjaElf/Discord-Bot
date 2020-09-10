const command = require('./command')
const ownerId = '650311336085159947'
const channelId = '751039004631367681'

module.exports = (client) => {
  command(client, 'eval', (message) => {
    const { member, channel, content } = message

    if (member.id === ownerId && channel.id === channelId) {
      const result = eval(content.replace('!eval ', ''))

      channel.send(result)
    }
  })
}
