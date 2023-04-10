const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/test"

const { connect, connection, STATES } = require("mongoose")

exports.state = STATES[connection.readyState]

;(async () => {
  try {
    await connect(mongoUrl, { keepAlive: true, keepAliveInitialDelay: 300000 })
  } catch (err) {
    console.error(err)
  }
})()

connection.once("connected", () => console.log("Connected to MongoDB!"))

connection.on("connected", () => exports.state = STATES[connection.readyState])
connection.on("connecting", () => exports.state = STATES[connection.readyState])
connection.on("disconnecting", () => exports.state = STATES[connection.readyState])
connection.on("disconnected", () => exports.state = STATES[connection.readyState])
