const csrfgen = require("../functions/csrfgen")

module.exports = {
    name: "test",
    description: "Test Command!",
    async execute(message, args) {
        message.channel.send("Check Console.")
        const csrf = await csrfgen("post", 'https://auth.roblox.com/')
        console.log(csrf)
    }
}