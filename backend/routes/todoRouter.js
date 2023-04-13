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

// Every request required will be in JSON.

router.post("/add", async (req, res) => {
  /* req.body example:
    {
      name: string,
      priority: int,
      reminder: {
        at: Date,
        every: str
      },
      tags: [string]
    }
   */
  if (!req.body.name) res.status(400).json({ error: "Bad request, no name specified." })
  const task = new taskModel()

  task.name = req.body.name
  task.pub_date = Date.now()

  await task.save()  // save to database

  res.json(task)
})

router.get("/", async (_, res) => {
  const tasks = await taskModel.find({})
  res.json(tasks)
})

router.get("/:id", async (req, res) => {
  res.json({
    todo: `Return todo entry of id: ${req.params.id}`
  })
})

router.put("/update/:id", async (req, res) => {
  const id = req.params.id
  const task = taskModel.find({ _id: id }).exec()
  if (!task) res.status(404).json({ error: "Task of such id does not exist." })
  // update task
  res.json({
    todo: `Edit and update todo entry of id: ${id}`
  })
})

router.delete("/delete/:id", async (req, res) => {
  res.json({
    todo: `Delete todo entry of id: ${id}`
  })
})

module.exports = router
