const Discord = require('discord.js');
const client = new Discord.Client();
const configs = require('./config');
const fs = require('fs');


client.on('ready', () => {
  console.log(`Bot online | ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.substr(0,1) === configs.prefix) {
    try {
      cmd = msg.content.substr(1,msg.content.length);
      if(cmd == 'reg') register(msg);  
      if(cmd == 'test') test(msg);
      if(cmd == 'stat') statistic(msg);
    } catch (e) {
      console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
    }
  }else{
    console.log(msg.content)
  }
});
client.login(configs.TOKEN);




function register(msg){
  DataBase = JSON.parse(fs.readFileSync('DataBaseUsers.txt', 'utf-8'));
  for(element in DataBase) {
    if(DataBase[element].ID == msg.author.id){ 
      msg.channel.send('Вы уже зарегистрированы!')
      return 0 }
  }
  DataBase.push({
    'ID': msg.author.id,
    'Name': msg.author.username,
    'statistic': {
      'messenges': 0,
      'Money': 0,
      'EXP': 0,
    },
    'achievements': {
      
    }
  }); 
  fs.writeFileSync('DataBaseUsers.txt', JSON.stringify(DataBase));
  msg.channel.send('Регистрация прошла успешно!')
}
function test(msg) {
  console.log(msg.guild.members)
}