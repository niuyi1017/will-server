const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const momentSchema = new Schema({
  author: {
    type: ObjectId,
    ref: 'User'
  },
  content: String,
  picUrls: [],
  
  // comments: [{
  //   type: ObjectId,
  //   ref: 'Comment'
  // }],
  read_num: {
    type: Number,
    default: 0
  },
  favour_num: {
    type: Number,
    default: 0
  },
  like_num: {
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
  like: [
    {
      type: ObjectId,
      ref: 'User',
      unique: true
    }
  ],
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

momentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Moment', momentSchema)
