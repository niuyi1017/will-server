const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const specialSchema = new Schema({
  special_id: {
    type: String,
    unique: true
  },
  special_name: String,

  level1: Number,
  level1_name:String, //层次（本科、专科）

  // category_id: Number,  // level2: Number,
  // category_name: String, //level2_name, category_name (用于筛选,如经济学)

  level3: Number, 
  level3_name :String, //分类名称 经济学类

  limit_year: String, //年限 四年
  degree: String, //学位（学士）

  rankall: Number,
  rank_type: Number,

  // category: {
  //   type: ObjectId,
  //   ref: 'CategorySpecail'
  // },
  
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
    console.log('isnew')
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    console.log('!isnew')
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Special', specialSchema)