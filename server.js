const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require("dotenv").config()

const app = require("./src/app")

const connectTODB = require("./src/config/database")



app.listen(3000,() => {

    console.log("server is runing on port 3000")

})
connectTODB()