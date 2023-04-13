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
      description: string
      priority: int,
      reminder: {
        at: Date,
        every: str
      },
      tags: [string]
    }
   */
  if (!req.body.name) {
    res.status(400).json({ error: "Bad request, no name specified." })
  }
  const task = new taskModel()

  task.name = req.body.name
  task.description = req.body.description
  task.pub_date = Date.now()
  task.priority = req.body.priority

  if (req.body.reminder) {
    task.reminder = {
      at: req.body.reminder.at,
      every: req.body.reminder.every
    }
  }

  task.tags = req.body.tags || []
  task.completed = false  // default value

  await task.save()  // save to database

  res.json(task)
})

router.get("/", async (_, res) => {
  const tasks = await taskModel.find({})
  res.json(tasks)
})

router.get("/:id", async (req, res) => {
  const task = await taskModel.findById(req.params.id).exec()
  if (!task) {
    res.status(404).json({ error: "Task of such id does not exist." })
    return
  }
  res.json(task)
})

router.put("/update/:id", async (req, res) => {
  const id = req.params.id
  const task = await taskModel.findById(id).exec()
  if (!task) {
    res.status(404).json({ error: "Task of such id does not exist." })
    return
  }

  task.name = req.body.name
  task.description = req.body.description
  task.priority = req.body.priority

  if (req.body.reminder) {
    task.reminder = {
      at: req.body.reminder.at,
      every: req.body.reminder.every
    }
  }

  task.tags = req.body.tags || []
  task.completed = req.body.completed

  await task.save()

  res.json(task)
})

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  const task = await taskModel.findById(id).exec()
  if (!task) {
    res.status(404).json({ error: "Task of such id does not exist." })
    return
  }

  await taskModel.findByIdAndDelete(id).exec()

  res.json({ deleted: task })
})

module.exports = router
