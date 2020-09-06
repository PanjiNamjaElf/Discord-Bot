const message = require('./message')

module.exports = client => {
  const channelId = '751039004631367681'

  const getEmoji = emojiName => client.emojis.cache.find(
    emoji => emoji.name === emojiName
  )

  const emojis = {
    KianaPossessed: 'Tim Kiana',
    HimekoKiss: 'Tim Himeko',
  }

  const reactions = []

  let emojiText = 'Add reaction to claim a role\n\n'

  for (const key in emojis) {
    const emoji = getEmoji(key)

    reactions.push(emoji)

    const role = emojis[key]

    emojiText += `${emoji} = ${role}\n`
  }

  message(client, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if (user.id === '751037484351094855') {
      return
    }

    const emoji = reaction._emoji.name
    const { guild } = reaction.message
    const roleName = emojis[emoji]

    if (!roleName) {
      return
    }

    const role = guild.roles.cache.find(
      role => role.name === roleName
    )

    const member = guild.members.cache.find(
      member => member.id === user.id
    )

    if (add) {
      member.roles.add(role)
    } else {
      member.roles.remove(role)
    }
  }

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}
