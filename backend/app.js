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
    databaseStatus: mongo.state 
  })
})

const todoRouter = require("./routes/todoRouter")
const tagRouter = require("./routes/tagRouter")
app.use("/todo", todoRouter)
app.use("/tag", tagRouter)

app.listen(3000)
