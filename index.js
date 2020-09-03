const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const command = require('./commands/command')

client.on('ready', function () {
  console.log(`${client.user.username} is ready!`);

  command(client, 'ping', (message) => {
    message.channel.send('Pong!')
  })
})

client.login(config.token);
