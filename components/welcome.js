module.exports = client => {
  const channelId = '751039004631367681' // development channel
  const targetChannelId = '745446164123484270' // rules channel

  client.on('guildMemberAdd', member => {
    const targetChannel = member.guild.channels.cache.get(targetChannelId).toString()
    const message = `Please welcome <@${member.id}> to the server! Please check out ${targetChannel}`
    const channel = member.guild.channels.cache.get(channelId)

    channel.send(message)
  })
}
