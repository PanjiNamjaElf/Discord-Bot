const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', function () {
  console.log('The client is ready!');
})

client.login(config.token);
