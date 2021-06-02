module.exports = function(method,url) {
    return new Promise((resolve,reject)=> {
        const request = require("request")
        const cookie = require('../config.json').cookie
        let csrf 
        let options
        options = {
            url: url,
            headers: {
                ".ROBLOSECURITY": cookie
            }
        }
        if (method == "post") {
            request.post(options, (err,res,bodu) => {
                if(!options.headers["x-csrf-token"]) {
                    if (res.statusCode == 403) {
                        csrf = res.headers["x-csrf-token"]
                        options = {
                            url: url,
                            headers: {
                                ".ROBLOSECURITY": cookie,
                                "x-csrf-token": csrf
                            }
                        }
                        request.post(options, (err,res,body) => {
                            resolve(csrf)
                        }) 
                    }

                }
            })
        }
    })
}