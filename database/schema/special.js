const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const specialSchema = new Schema({
  special_id: {
    type: String
  },
  special_name: String,

  level1: Number,
  level1_name:String, //层次（本科、专科）

  level3: Number, 
  level3_name :String, //分类名称 经济学类

  limit_year: String, //年限 四年
  degree: String, //学位（学士）

  rankall: Number,
  rank_type: Number,

  
  // articles:[ObjectId],
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
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

specialSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    console.log('!isnew')
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Special', specialSchema)