const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const specialSchema = new Schema({
  category_id: {
    type: String,
    unique: true
  },
  
  category_name: String,
 
  // articles:[ObjectId],
  specials: [{
    type: ObjectId,
    ref: 'Special'
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

sapecialSchema.pre('save', function (next) {
  if (this.isNew) {
    console.log('isnew')
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    console.log('!isnew')
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Special', sapecialSchema)