const express           = require("express")
const io                = require("socket.io")
const cookie            = require("cookie-parser")
const HTTPRequestParser = require("body-parser")
const HTTP              = require("http")
const path              = require("path")
const ejs               = require("ejs")
const MongoClient       = require("mongodb").MongoClient

const uri           = "mongodb+srv://admin:kakashka@sunshine.k3eim.mongodb.net/sunshine-database?retryWrites=true&w=majority"
const app           = express()                 // initialize express
const HTTPServer    = HTTP.createServer(app)    
const socket        = io(HTTPServer)            // initialize socket.io
const MongoDB       = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})

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
app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname, "favicon.ico")) // getting favicon
})

app.get("/static/mstile-70x70.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/mstile-70x70.png")) // getting favicon
})

app.get("/static/mstile-144x144.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/mstile-144x144.png")) // getting favicon
})

app.get("/static/mstile-150x150.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/mstile-150x150.png")) // getting favicon
})

app.get("/static/mstile-310x150.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/mstile-310x150.png")) // getting favicon
})

app.get("/static/mstile-310x310.pngg", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/mstile-310x310.png")) // getting favicon
})

app.get("/static/apple-touch-icon.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/apple-touch-icon.png"))
})

app.get("/static/android-chrome-192x192.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/android-chrome-192x192.png"))
})

app.get("/static/android-chrome-512x512.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/android-chrome-512x512.png"))
})

app.get("/static/safari-pinned-tab.svg", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/safari-pinned-tab.svg"))
})

app.get("/static/browserconfig.xml", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/browserconfig.xml"))
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

let succefull_connection = false

app.post("/register_me", (req, res) => {
    const data = [req.body.name, req.body.login, req.body.password]

    if (succefull_connection) {
        const collection = MongoDB.db("sunshine-database").collection("users")

        collection.insertOne({name: data[0], login: data[1], password: data[2]})
        .then(() => {
            res.render('success', {
                name: data[0]
            })
        })
        .catch((reason) => {
            res.write("Какая-то ошибка")
        })
    } else {
        res.write("Какая-то ошибка")
    }
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

    res.render('registration', {
        randomRegDataTemplate: template[randomRegData]
    }) 
})
//#endregion 

// starting server
HTTPServer.listen(PORT, () => {
    MongoDB.connect()
    .then(() => {
        succefull_connection = true

        console.log("Успешное подключение к базе данных")
    })
    .catch((err) => {
        throw err
    })
})

function withoutCyrCheck(data) {
    var value = data;
    var re = /а|б|в|г|д|е|ё|ж|з|и|ё|к|л|м|н|о|п|р|с|т|у|ф|х|ц|ч|ш|щ|ъ|ы|ь|э|ю|я/gi;

    return re.test(value)
}