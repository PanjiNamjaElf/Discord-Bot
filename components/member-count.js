module.exports = client => {
  const channelId = '752099133854187532' // Members voice channel

  const updateMembers = guild => {
    const channel = guild.channels.cache.get(channelId)

    channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
  }

  client.on('guildMemberAdd', member => updateMembers(member.guild))
  client.on('guildMemberRemove', member => updateMembers(member.guild))

  const guild = client.guilds.cache.get('745291969500283021')

  updateMembers(guild)
}
