const { model, Schema } = require("mongoose")

const reminderSchema = new Schema({
  at: Date,
  every: {
    type: String,
    validate: {
      validator: (s) => {
        if (!s) return true
        return /^\d+[hdwmy]$/.test(s)
      },
      message: "`every` must be a valid duration"
    }
  }
})

module.exports = model("TodoTask",
  new Schema({
    name: {
      type: String,
      required: true
    },
    description: String,
    pub_date: Date,
    priority: {
      type: Number,
      min: 0,
      default: 0,
      validate: {
        validator: (i) => Number.isInteger(i),
        message: "`priority` must be an integer"
      }
    },
    completed: Boolean,
    reminder: reminderSchema,
    tags: [String]
  })
)
