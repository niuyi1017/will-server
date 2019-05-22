const mongoose = require('mongoose')

module.exports = {
  newQuestion: async (_question) => {
    const Question = mongoose.model('Question')
    const User = mongoose.model('User')
    let uid = _question.author
    let result = {}
    try {
      let question = new Question(_question)
      let savedQuestion =  await question.save()
      let question_id = savedQuestion._id
      let update = {
          $push:{ "post.question":question_id},
          $inc: { post_num: 1 }
      }
      let user = await User.findByIdAndUpdate(uid, update)
      result = {
        question_id,
        uid: user._id
      }
    }catch (error) {
      return new Error(error)
    }
    return result
  },
  questions: async (page, num) => {
    // const Question = mongoose.model('Question')
    // let result = await Question.find({})
    //   .skip(page * num)
    //   .limit(num)
    let result = [
      {
        "tag": "烟台大学",
        "postAt": "4 days ago",
        "question": "物联网工程学单片机吗",
        "answer": "谢邀，物联网工程专业大三狗一枚。bulabulabula~",
        "avatar": "132.jpg",
        "userName": "牛鑫语",
        "agreeNum": "16",
        "recommendNum": "14"
      },
      {
        "tag": "平行志愿",
        "postAt": "4 days ago",
        "question": "平行志愿测试测试测试",
        "answer": "关于平行志愿，你可以从这些方面进行了解。比如A，的罚款进发啊代缴罚款大解放",
        "avatar": "132.jpg",
        "userName": "牛鑫语",
        "agreeNum": "5",
        "recommendNum": "7"
      },
      {
        "tag": "物联网工程",
        "postAt": "5 days ago",
        "question": "物联网工程",
        "answer": "物联网工程物联网工程物联网工程物联网工程物联网工程物联网工程",
        "avatar": "132.jpg",
        "userName": "牛鑫语",
        "agreeNum": "2",
        "recommendNum": "5"
      },
      {
        "tag": "四六级",
        "postAt": "5 days ago",
        "question": "有的学校大一为什么不能考四级呢",
        "answer": "谢邀。关于四六级，不同学校有不同的规定。部分学校不允许在大一上学期考四六级拉~",
        "avatar": "132.jpg",
        "userName": "我是菲兹",
        "agreeNum": "12",
        "recommendNum": "15"
      },
      {
        "tag": "海滨城市",
        "postAt": "5 days ago",
        "question": "在海滨城市大学读书是怎样的体验",
        "answer": "不请自来。大四狗一枚，来自烟台大学。烟台大学不仅是距海近，而且是国内距海最近的大学，没有之一。",
        "avatar": "132.jpg",
        "userName": "我是菲兹",
        "agreeNum": "2",
        "recommendNum": "1"
      },
      {
        "tag": "校企合作",
        "postAt": "6 days ago",
        "question": "如何看待大学与企业共建的「校企合作」专业",
        "answer": "物联网工程（校企合作）专业大四在读，我感觉我们专业还是很好的。只要自己认真学，找工作是比普通专业方便很多",
        "avatar": "132.jpg",
        "userName": "我是菲兹",
        "agreeNum": "1",
        "recommendNum": "1"
      },
      {
        "tag": "烟台大学",
        "postAt": "6 days ago",
        "question": "测试",
        "answer": "继续测试",
        "avatar": "132.jpg",
        "userName": "科尔森",
        "agreeNum": "2",
        "recommendNum": "5"
      },
      {
        "tag": "测试",
        "postAt": "6 days ago",
        "question": "测试测试测试",
        "answer": "测试测试测试",
        "avatar": "132.jpg",
        "userName": "科尔森",
        "agreeNum": "3",
        "recommendNum": "3"
      },
      {
        "tag": "测试",
        "postAt": "6 days ago",
        "question": "还是继续测试测试测试",
        "answer": "还是测试",
        "avatar": "132.jpg",
        "userName": "科尔森",
        "agreeNum": "7",
        "recommendNum": "6"
      },
      {
        "tag": "测试结果",
        "postAt": "6 days ago",
        "question": "测试完成了吗？",
        "answer": "今天will倒闭了吗",
        "avatar": "132.jpg",
        "userName": "牛鑫语",
        "agreeNum": "undefined",
        "recommendNum": "undefined"
      },
      {
        "tag": "继续测试",
        "postAt": "6 days ago",
        "question": "测测测测测测",
        "answer": "测测测测测测",
        "avatar": "132.jpg",
        "userName": "牛鑫语",
        "agreeNum": "undefined",
        "recommendNum": "undefined"
      },
      {
        "tag": "四测",
        "postAt": "6 days ago",
        "question": "QA四测",
        "answer": "QA四测",
        "avatar": "132.jpg",
        "userName": "牛鑫语",
        "agreeNum": "14",
        "recommendNum": "6"
      },
      {
        "tag": "第三次测试",
        "postAt": "6 days ago",
        "question": "第二次QA测试",
        "answer": "这里是playground的QA部分，现在进行第三次次测试",
        "avatar": "132.jpg",
        "userName": "牛鑫语",
        "agreeNum": "26",
        "recommendNum": "undefined"
      },
      {
        "tag": "第二次测试",
        "postAt": "6 days ago",
        "question": "第二次QA测试",
        "answer": "这里是playground的QA部分，现在进行第二次测试",
        "avatar": "132.jpg",
        "userName": "牛鑫语",
        "agreeNum": "undefined",
        "recommendNum": "undefined"
      },
      {
        "tag": "第一次测试",
        "postAt": "6 days ago",
        "question": "QA测试",
        "answer": "这里是playground的QA部分，现在进行第一次测试",
        "avatar": "132.jpg",
        "userName": "牛鑫语",
        "agreeNum": "undefined",
        "recommendNum": "undefined"
      }
    ]
    return result
  },
  question: async (question_id) => {
    const Question = mongoose.model('Question')
    let result = await Question.findByIdAndUpdate(question_id, { $inc: { read_num: 1 }})
    return result
  },
  favour: async (question_id,uid) => {
    const Question = mongoose.model('Question')
    const User = mongoose.model('User')
    let updateQuestion = {
      $push: { favour: uid },
      $inc: { favour_num: 1 }
    }
    let updateUser = {
      $push: { "favour.question": question_id },
      $inc: { favour_num: 1 }
    }
    try {
      let question = await Question.findByIdAndUpdate(question_id, updateQuestion)
      let user = await User.findByIdAndUpdate(uid, updateUser)
      result = {
        question_id: question._id,
        favour_num: question.favour_num,
        user: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
  cancelFavour: async (question_id, uid) => {
    const Question = mongoose.model('Question')
    const User = mongoose.model('User')
    let updateQuestion = {
      $pull: { favour: uid },
      $inc: { favour_num: -1 }
    }
    let updateUser = {
      $pull: { "favour.question": question_id },
      $inc: { favour_num: -1 }
    }
    try {
      let question = await Question.findByIdAndUpdate(question_id, updateQuestion)
      let user = await User.findByIdAndUpdate(uid, updateUser)
      result = {
        question_id: question._id,
        favour_num: question.favour_num,
        user: user._id
      }
    } catch (error) {
      return new Error(error)
    }
    return result
  },
}
