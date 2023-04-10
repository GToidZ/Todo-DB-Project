const { Router } = require("express")
const taskModel = require("../models/task")

const router = Router()

/*
 *  All routes in here must make an async callback.
 *  POST /add -> Create a new todo entry
 *  GET / -> Returns all todo entries
 *  GET /:id -> Returns details of a todo entry of `:id`
 *  PUT /update/:id -> Update a todo entry of `:id`
 *  DELETE /delete/:id -> Delete a todo entry of `:id`
 */

router.post("/add", async (req, res) => {
})

router.get("/", async (_, res) => {
  res.json({
    todo: "Return all todo entries"
  })
})

router.get("/:id", async (req, res) => {
  res.json({
    todo: `Return todo entry of id: ${req.params.id}`
  })
})

router.put("/update/:id", async (req, res) => {
})

router.delete("/delete/:id", async (req, res) => {
})

module.exports = router
