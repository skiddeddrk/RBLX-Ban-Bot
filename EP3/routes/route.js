const { MessageEmbed } = require("discord.js")
const { response } = require("express")
const {banList, client} = require("../index")


module.exports = function(app) {
    app.get("/ban", async function (req,res) {
       if (req.headers.username !== undefined) {
           const channel = await client.channels.cache.get(req.headers.channelId)
           channel.messages.fetch(request.headers.messageId)
           .then(msg => {
               if (request.headers.rblxerror == undefined) {
                   const Embed = new MessageEmbed()
                   .setColor("GREEN")
                   .setTitle("Ban Success!")
                   .addField("Username", request.headers.username)
                   .setTimestamp()

                   if (msg.author !== undefined) {
                       msg.edit(Embed)
                   } else {
                       channel.send(Embed)
                   }

               } else {
                const failEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription("Failure Banning User!")
                if (msg.author !== undefined) {
                    msg.edit(failEmbed)
                } else {
                    channel.send(failEmbed)
                }
               }
           }).catch(err => {
               console.log(err)
           })

       } 
       response.send(banList[0])
       banList.shift()
    })
}
