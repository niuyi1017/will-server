const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2*60*60*1000

const userSchema = new Schema({
 
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: Number,
    default: 0
  },
  email:{
    type: String
  },
  // major: [ObjectId],
  // highSchool: [ObjectId],
  follower: [{
    type: ObjectId,
    ref: 'User'
  }],
  following: [{
    type: ObjectId,
    ref: 'User'
  }],
  contact: [{
    type: ObjectId,
    ref: 'User'
  }],
  school: [{
      type: ObjectId,
      ref: 'School'
  }],
  // post: [ObjectId],
  // comment: [ObjectId],

  lockUntil: Number,
  loginAttempts: {
    type: Number,
    required: true,
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

userSchema.virtual('isLocked').get(() => {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

userSchema.pre('save', function (next) {
  if(this.isNew){
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  }else{
    this.updatedAt = Date.now()
  }
  next()
})
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  
  bcrypt.genSalt(SALT_WORK_FACTOR, (err,salt) => {
    if(err) return next(err)
    bcrypt.hash(this.password,salt,(error,hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password,(err, isMatch) => {
        if(!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  incLoginAttempts: (user) => {
    return new Promise((resolve, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now()){
        this.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            lockUntil: 1
          }
        },(err) => {
          if(!err) resolve(true)
          else reject(err)
        })
      }else{
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }
        if(this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }
        this.update(updates, err => {
          if(!err) resolve(true)
          else reject(err)
        })
      }
    })
  }
}
mongoose.model('User', userSchema)