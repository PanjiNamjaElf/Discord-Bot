const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const command = require('./commands/command')

client.on('ready', function () {
  console.log(`${client.user.username} is ready!`);

  command(client, 'ping', (message) => {
    message.channel.send('Pong!')
  })

  command(client, 'servers', (message) => {
    client.guilds.cache.forEach((guild) => {
      console.log(guild)
    })
  })
})

client.login(config.token);
