require("dotenv").config()
const app = require("./src/app")

app.listen(3000,() => {
    console.log("server is runing on post 3000")
})