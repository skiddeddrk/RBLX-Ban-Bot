const {MessageEmbed} = require("discord.js")

module.exports = function(user,msg,method) {
    return new Promise((resolve, reject) => {
        const banList = require('../index').banList
        const request = require("request")
        const Embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`Adding ${user} to Ban List!`)
        msg.edit(Embed)
        request.get(`https://api.roblox.com/users/get-by-username?username=${user}`, (err, res, body) => {
            let recievedData = ''
            res.on("data", d => {
                recievedData += d
            })
            res.on("end", () => {
                if (~JSON.parse(recievedData).Id !== undefined) {
                    banList.push({type: method,value : JSON.parse(recievedData).Id,username :JSON.parse(recievedData).Username, channelId : msg.channel.id, messageId: msg.id })
                }
            }).on("error"), error => {
                console.error("Error using the USERNAME API!")
            }
        })
    })
}