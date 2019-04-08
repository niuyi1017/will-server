const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const schoolSchema = new Schema({
  school_id: {
    type: String,
    unique:true
  },
  is211: Boolean,
  is985: Boolean,
  isDual_class: String,
  logo: String,
  name: String,
  type: String,

  desc: String,
  pics: [String],
  summary: String,
  // articles:[ObjectId],
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
  // major:[ObjectId],
  // tags: [ObjectId],

  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    },
  }
})

schoolSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.updatedAt = Date.now()
  }
  next()
})

mongoose.model('School', schoolSchema)