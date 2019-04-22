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
  
  read_num: Number,
  like_num: Number,
  favorite_num: Number,

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
    console.log('isnew')
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    console.log('!isnew')
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Question', questionSchema)