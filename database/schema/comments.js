const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const commentSchema = new Schema({
  author: {
    type: ObjectId,
    ref: 'User'
  },
  
  content: String,
  replyType:{
    type:Number
  },//0 ：同学圈，1：文章，2：回答
  momentId: String,
  replys: [{
    from:{
      type: ObjectId,
      ref: 'User'
    },
    to: {
      type: ObjectId,
      ref: 'User'
    },
    content: String
  }],
  
 
  like_num: {
    type: Number,
    default: 0
  },
  
  
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

commentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Comment', commentSchema)
