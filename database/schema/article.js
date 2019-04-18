const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const articleSchema = new Schema({
  title: String,
  author: {
            type: ObjectId,
            ref: 'User'
          },
  
  content: {
    picList: [],
    title: String, 
    text: String
  },
  // comments: [{
  //   type: ObjectId,
  //   ref: 'Comment'
  // }],
  read_num: Number,
  like_num: Number,
  favorite_num: Number,
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

articleSchema.pre('save', function (next) {
  if (this.isNew) {
    console.log('isnew')
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    console.log('!isnew')
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Article', articleSchema)