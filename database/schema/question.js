const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const questionSchema = new Schema({
  tag: String,
  title: String,
  picUrls: [],
  content: String,
  author: {
    type: ObjectId,
    ref: 'User'
  },
  
  read_num: {
    type: Number,
    default:0
  },
  favour_num: {
    type: Number,
    default: 0
  },
  favour: [
    {
      type: ObjectId,
      ref: 'User',
      unique: true
    }
  ],

  // comments: [{
  //   type: ObjectId,
  //   ref: 'Comment'
  // }],

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

questionSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Question', questionSchema)