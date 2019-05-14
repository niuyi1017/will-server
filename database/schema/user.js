const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
  phoneNumber: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  pinyin: String,
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: 0
  },
  email: {
    type: String
  },
  avatar: {
    type: String,
    default: "http://blogpic.niuy.xyz/Screenshot_20170417-232840_1.jpg"
  },

  major: String,
  highSchool: String,

  intro: String,
  tags: [String],
  follower: [{
    type: ObjectId,
    ref: 'User',
    unique: true
  }],
  following: [{
    type: ObjectId,
    ref: 'User',
    unique: true
  }],
  contact: [{
    type: ObjectId,
    ref: 'User',
    unique: true
  }],
  school: [{
    type: ObjectId,
    ref: 'School',
    unique: true
  }],

  post_num: {
    type: Number,
    default: 0
  },
  post: {
    question: [{
      type: ObjectId,
      ref: 'Question',
      unique: true
    }],
    article: [{
      type: ObjectId,
      ref: 'Article',
      unique: true
    }],
    answer: [{
      type: ObjectId,
      ref: 'Answer',
      unique: true
    }],
    moment: [{
      type: ObjectId,
      ref: 'Moment',
      unique: true
    }],
    comment: [{
      type: ObjectId,
      ref: 'Comment',
      unique: true
    }],
  },

  like_num: {
    type: Number,
    default: 0
  },
  like: {
    question: [{
      type: ObjectId,
      ref: 'Question',
      unique: true
    }],
    article: [{
      type: ObjectId,
      ref: 'Article',
      unique: true
    }],
    answer: [{
      type: ObjectId,
      ref: 'Answer',
      unique: true
    }],
    moment: [{
      type: ObjectId,
      ref: 'Moment',
      unique: true
    }],
    comment: [{
      type: ObjectId,
      ref: 'Comment',
      unique: true
    }],
  },

  favour_num: {
    type: Number,
    default: 0
  },

  favour: {
    question: [{
      type: ObjectId,
      ref: 'Question',
      unique: true
    }],
    article: [{
      type: ObjectId,
      ref: 'Article',
      unique: true
    }],
    answer: [{
      type: ObjectId,
      ref: 'Answer',
      unique: true
    }],
    moment: [{
      type: ObjectId,
      ref: 'Moment',
      unique: true
    }],
    comment: [{
      type: ObjectId,
      ref: 'Comment',
      unique: true
    }],
  },
  recentlyMoments:[],
  notifications:[{
    from:{
      type: ObjectId,
      ref: 'User',
      unique: true
    },
    message:String,
    postTime: String,
    articlePic: String,
    isFollow:{
      type: Boolean,
      default: false
    }
  }],
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
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.updatedAt = Date.now()
  }
  next()
})
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (error, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePassword: (_password, password) => { //_password 表单，password 数据库
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  incLoginAttempts: (user) => {
    return new Promise((resolve, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            lockUntil: 1
          }
        }, (err) => {
          if (!err) resolve(true)
          else reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }
        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }
        this.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })
  }
}
mongoose.model('User', userSchema)