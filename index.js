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

//#region including middleware handlers
app.set("view engine", "ejs")

app.use(cookie())
app.use(HTTPRequestParser.urlencoded({
    type: "application/x-www-form-urlencoded",
    extended: true
}))
//#endregion

//#region include static files
app.get("/static/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/favicon.ico")) // getting favicon
})

app.get("/static/lib/bootstrap/bootstrap.min.css", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/lib/bootstrap.min.css")) // getting bootsrap css
})

app.get("/static/lib/bootstrap/bootstrap.min.js", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/lib/bootstrap.min.js")) // getting bootsrap js
})

app.get("/static/site.webmanifest", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/site.webmanifest")) // getting webmanifest
})

app.get("/static/favicon-32x32.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/favicon-32x32.png")) // getting favicon
})

app.get("/static/favicon-16x16.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/favicon-16x16.png")) // getting favicon
})

app.get("/static/assets/css/main.css", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/assets/css/main.css"))
})

app.get("/static/assets/img/sun.svg", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/assets/img/sun.svg"))
})

app.get("/static/assets/js/client.js", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/assets/js/client.js"))
})
//#endregion

//#region handling client requests
app.get("/", (req, res) => {
    res.render('index') 
})

app.get("/registration", (req, res) => {
    const template = [
        {name: "Даниил", login: "PIPING_GAY"},
        {name: "Артём", login: "electrify_me"},
        {name: "Аделина", login: "_ADELBLEN_"},
        {name: "Андрей", login: "Yazeus"},
        {name: "Миша", login: "stonks"},
        {name: "Эвелина", login: "blackstalker228"},
        {name: "Василиса", login: "fony666"}
    ]

    const randomRegData = Math.ceil((Math.random() * template.length) - 1)
    console.log(randomRegData)

    res.render('registration', {
        randomRegDataTemplate: template[randomRegData]
    }) 
})
//#endregion 

// starting server
HTTPServer.listen(PORT, () => {})