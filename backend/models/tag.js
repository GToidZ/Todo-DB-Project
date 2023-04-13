const { model, Schema } = require("mongoose")

module.exports = model("TodoTag",
  new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 1
    },
    priority: {
      type: Number,
      min: 0,
      validate: {
        validator: (i) => Number.isInteger(i),
        message: "`priority` must be an integer"
      }
    }
  })
)
