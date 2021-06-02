const Discord = require("discord.js")

const {prefix, token} = require("./config.json")
const fs = require("fs")
const client = new Discord.Client()
client.commands = new Discord.Collection()
require('./routes/app')()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

var banList = []
module.exports = {
    banList,
    client
}

client.once("ready", () => {
    console.log("Bot Ready!")
})

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return
    try {
        client.commands.get(command).execute(message, args)
    } catch (error) {
        console.error(error)
        message.channel.send("Error Executing Command")
    }
})

client.login(token)