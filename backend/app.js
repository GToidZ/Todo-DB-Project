require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()
const env = process.env.NODE_ENV || "development"

const mongo = require("./mongo")

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (env == "development") {
  const debugMiddleware = (req, _, next) => {
    console.log(`${req.ip} > ${req.method} ${req.path}`)
    req.method != "GET" && console.log(req.body)
    next()
  }
  app.use(debugMiddleware)
}

app.all("/", (_, res) => {
  res.json({
    environment: env,
    databaseStatus: mongo.state 
  })
})

const todoRouter = require("./routes/todoRouter")
app.use("/todo", todoRouter)

app.listen(3000)
