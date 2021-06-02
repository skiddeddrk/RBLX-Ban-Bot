module.exports = function() {
    const Express = require("express")

    const app = Express()
    require('./route')(app)
    app.get("/", (req,res) => {
        res.send("Works")
    })

    app.listen(3000)
    console.log("Listening on port 3000!")
}