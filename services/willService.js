const article = require('../dao/article')
const user = require('../dao/user')
const special = require('../dao/special')
const school = require('../dao/school')

module.exports = {
  slideShows:  () => {
    let slideShows = [
      {
        "tag": "烟台大学",
        "imgUrl": "http://prt246ayv.bkt.clouddn.com/%E7%A8%BF%E5%AE%9A%E8%AE%BE%E8%AE%A1%E5%AF%BC%E5%87%BA-20190521-205358.png",
        "title": "距海最近的大学 -- 烟台大学",
      },
      {
        "tag": "烟台大学",
        "imgUrl": "http://prt246ayv.bkt.clouddn.com/%E7%A8%BF%E5%AE%9A%E8%AE%BE%E8%AE%A1%E5%AF%BC%E5%87%BA-20190521-204445.png",
        "title": "距海最近的大学 -- 烟台大学",
      },
      {
        "tag": "烟台大学",
        "imgUrl": "http://prt246ayv.bkt.clouddn.com/%E7%A8%BF%E5%AE%9A%E8%AE%BE%E8%AE%A1%E5%AF%BC%E5%87%BA-20190521-204246.png",
        "title": "距海最近的大学 -- 烟台大学",
      },
      {
        "tag": "烟台大学",
        "imgUrl": "http://prt246ayv.bkt.clouddn.com/%E7%A8%BF%E5%AE%9A%E8%AE%BE%E8%AE%A1%E5%AF%BC%E5%87%BA-20190521-205224.png",
        "title": "距海最近的大学 -- 烟台大学",
      },
      {
        "tag": "烟台大学",
        "imgUrl": "http://prt246ayv.bkt.clouddn.com/%E7%A8%BF%E5%AE%9A%E8%AE%BE%E8%AE%A1%E5%AF%BC%E5%87%BA-20190521-204022.png",
        "title": "距海最近的大学 -- 烟台大学",
      },
      {
        "tag": "烟台大学",
        "imgUrl": "http://prt246ayv.bkt.clouddn.com/%E7%A8%BF%E5%AE%9A%E8%AE%BE%E8%AE%A1%E5%AF%BC%E5%87%BA-20190521-204938.png",
        "title": "距海最近的大学 -- 烟台大学",
      }
      
    ]
    return slideShows
  },
  hotArticles: async() => {
    let result = await article.articles(0, 5)
    return result
  },
  recommendArticles: async(uid) => {
    let recommendArticles = []
    
    let result = await article.articles(0, 5)
    for(let i = result.length-1; i>=0;i--){
      recommendArticles.push(result[i])
    }
    return recommendArticles
  },
  recommendPeople: async(uid) => {
    let result = await user.users(0, 8)
    return result
  },
  hotSchools: async(uid) => {
    let result = await school.schools(0, 8)
    return result
  },
  hotSpecials: async (uid) => {
    let result = await special.specials(27, 10)
    return result
  }
}