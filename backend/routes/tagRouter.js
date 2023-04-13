const { Router } = require("express")
const tagModel = require("../models/tag")

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

router.post("/addTag", async (req, res) => {
    /* req.body example:
      {
        name: string,
        priority: int,
      }
     */
    if (!req.body.name) return res.status(400).json({ error: "Bad request, no name specified." })
    try {
        const tag = new tagModel()

        tag.name = req.body.name
        tag.priority = req.body.priority

        await tag.save()  // save to database

        res.json(tag)

    } catch (error) {
        res.json(error)
    }
})

router.get("/getTag", async (_, res) => {
    const tag = await tagModel.find({})
    res.json(tag)
})

router.get("/:name", async (req, res) => {
    try {
        const find_name = await tagModel.findOne({ name: req.params.name }).exec()
        if (!find_name) return res.status(404).json({ error: "Tag name does not exist." })
        res.json({
            find_name
        })
    } catch (error) {
        res.json(error)
    }
})

router.put("/update/:name", async (req, res) => {
    const curr_name = req.params.name
    const new_name = req.body.name
    const new_priority = req.body.priority

    // update tag
    doc = tagModel.findOneAndUpdate({ name: curr_name, priority: 1 }, { $set: { name: new_name, priority: new_priority } }, { new: true })
    res.json({ "name": doc.name, "priority": doc.priority })
})

router.delete("/delete/:name", async (req, res) => {
    const name = req.params.name
    doc = tagModel.findOneAndDelete({name: name})
    res.json({
        doc
    })
})

module.exports = router

// addtag, edittag, gettag, deletetag,