const express           = require("express")
const io                = require("socket.io")
const cookie            = require("cookie-parser")
const HTTPRequestParser = require("body-parser")
const HTTP              = require("http")
const path              = require("path")

const app           = express()                 // initialize express
const HTTPServer    = HTTP.createServer(app)    
const socket        = io(HTTPServer)            // initialize socket.io

const PORT = process.env.PORT || 3000 

// including middleware handlers
app.set("view engine", "ejs")

app.use(cookie())
app.use(HTTPRequestParser.urlencoded({
    type: "application/x-www-form-urlencoded",
    extended: true
}))

// getting favicon
app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname, "/favicon.ico"))
})

// handling requests
app.get('/', (req, res) => {
    res.render("index", {
        dataGovno: "jopa"
    })
})

// starting server
HTTPServer.listen(PORT, () => {

})