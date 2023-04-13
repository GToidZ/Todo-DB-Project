const { Router } = require("express")
const tagModel = require("../models/tag")

const router = Router()

/*
 *  All routes in here must make an async callback.
 *  POST /addTag -> Create a new Tag
 *  GET / -> Returns all todo tag entries
 *  GET /:name -> Returns details of a todo entry of `:name`
 *  PUT /update/:name -> Update a todo entry of `:name`
 *  DELETE /delete/:name -> Delete a todo entry of `:name`
 */

// Every request required will be in JSON.

router.post("/addTag", async (req, res) => {
    /* req.body example:
      {
        name: string,
        priority: int,
      }
     */
    const name = req.body.name
    const priority = req.body.priority

    if (!name) return res.status(400).json({ error: "Bad request, no name specified." })
    if (tagModel.findOne({ name: name })) return res.status(409).json({ error: "Duplicate name" })
    if (priority < 0) return res.status(405).json({ error: "Not allowed, priority can't be zero " })

    try {
        const tag = new tagModel()

        tag.name = name
        tag.priority = priority

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
    /* req.body example:
      {
        name: string,
        priority: int,
      }
     */
    const curr_name = req.params.name
    const new_name = req.body.name
    const new_priority = req.body.priority
    if (tagModel.findOne({ name: new_name })) return res.status(409).json({ error: "Duplicate name" })
    // update tag
    try {
        doc = await tagModel.findOneAndUpdate({ name: curr_name }, { $set: { name: new_name, priority: new_priority } }, { new: true })
        res.json({ "name": doc.name, "priority": doc.priority })
    } catch (error) {
        res.json(error)
    }
})

router.delete("/delete/:name", async (req, res) => {
    try {
        const name = req.params.name
        doc = await tagModel.findOneAndDelete({ name: name })
        if (!doc) return res.status(404).json({ error: "Tag name does not exist." })
        res.json({
            doc
        })
    } catch (error) {
        res.json(error)
    }
})

module.exports = router

// addtag, edittag, gettag, deletetag,