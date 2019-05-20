const article = require('../dao/article')
module.exports = {
  slideShows:  () => {
    let slideShows = [
      {
        "tag": "烟台大学",
        "imgUrl": "http://blogpic.niuy.xyz/3.jpg",
        "title": "距海最近的大学 -- 烟台大学",
        "read": "999",
        "comment": "999+",
        "heart": "999+"
      },
      {
        "tag": "烟台大学",
        "imgUrl": "http://blogpic.niuy.xyz/3.jpg",
        "title": "距海最近的大学 -- 烟台大学",
        "read": "999+",
        "comment": "999",
        "heart": "999+"
      },
      {
        "tag": "烟台大学",
        "imgUrl": "http://blogpic.niuy.xyz/3.jpg",
        "title": "距海最近的大学 -- 烟台大学",
        "read": "999+",
        "comment": "999",
        "heart": "999+"
      },
      {
        "tag": "烟台大学",
        "imgUrl": "http://blogpic.niuy.xyz/3.jpg",
        "title": "距海最近的大学 -- 烟台大学",
        "read": "999+",
        "comment": "999+",
        "heart": "999"
      },
      {
        "tag": "烟台大学",
        "imgUrl": "http://blogpic.niuy.xyz/3.jpg",
        "title": "距海最近的大学 -- 烟台大学",
        "read": "999+",
        "comment": "999",
        "heart": "999"
      }
    ]
    return slideShows
  },
  hotArticles: async() => {
    let hotArticles = [
      {
        "imgUrl": "http://blogpic.niuy.xyz/2.jpg",
        "author": "一只小小白",
        "title": "在距海最近的大学读书是怎样的体验",
        "like": "1234",
        "comment": "123",
        "read": "3.4k"
      },
    ]
    let result = await article.articles(0, 5)
    return result
    // return hotArticles
  },
  recommedArticles: (uid) => {
    let recommedArticles = []
    if(uid){
      recommedArticles = [
        {
          "imgUrl": "http://blogpic.niuy.xyz/2.jpg",
          "author": "一只小小白",
          "title": "在距海最近的大学读书是怎样的体验",
          "like": "1234",
          "comment": "123",
          "read": "3.4k"
        },
        {
          "imgUrl": "http://blogpic.niuy.xyz/2.jpg",
          "author": "一只小小白",
          "title": "在距海最近的大学读书是怎样的体验在距海最近的大学读书",
          "like": "1234",
          "comment": "123",
          "read": "3.4k"
        },
        {
          "imgUrl": "http://blogpic.niuy.xyz/2.jpg",
          "author": "一只小小白",
          "title": "在距海最近的大学读书是怎样的体验",
          "like": "1234",
          "comment": "123",
          "read": "3.4k"
        },
        {
          "imgUrl": "http://blogpic.niuy.xyz/2.jpg",
          "author": "一只小小白",
          "title": "在距海最近的大学读书是怎样的体验读书是怎样的体验",
          "like": "1234",
          "comment": "123",
          "read": "3.4k"
        }
      ]
    }else{
      recommedArticles = []
    }
    return recommedArticles
  },
  recommendPeople: (uid) => {
    let recommendPeople = []
    if(uid){
      recommendPeople = [
        {
          "avatar": "http://blogpic.niuy.xyz/t1.jpg",
          "name": "一只小小白",
          "desc": "与你均来自济北中学，就读于烟台大学物联网工程专业",
          "isFriend": false
        },
        {
          "avatar": "http://blogpic.niuy.xyz/t2.jpg",
          "name": "一只小小白",
          "desc": "与你均来自济北中学，就读于烟台大学物联网工程专业",
          "isFriend": false
        },
        {
          "avatar": "http://blogpic.niuy.xyz/t3.jpg",
          "name": "一只小小白",
          "desc": "与你均来自济北中学，就读于烟台大学物联网工程专业",
          "isFriend": false
        },
        {
          "avatar": "http://blogpic.niuy.xyz/t1.jpg",
          "name": "一只小小白",
          "desc": "与你均来自济北中学，就读于烟台大学物联网工程专业",
          "isFriend": false
        },
        {
          "avatar": "http://blogpic.niuy.xyz/t2.jpg",
          "name": "一只小小白",
          "desc": "与你均来自济北中学，就读于烟台大学物联网工程专业",
          "isFriend": false
        },
        {
          "avatar": "http://blogpic.niuy.xyz/t3.jpg",
          "name": "一只小小白",
          "desc": "与你均来自济北中学，就读于烟台大学物联网工程专业",
          "isFriend": false
        },
        {
          "avatar": "http://blogpic.niuy.xyz/t1.jpg",
          "name": "一只小小白",
          "desc": "与你均来自济北中学，就读于烟台大学物联网工程专业",
          "isFriend": false
        }
      ]
    }
    else{
      recommendPeople = []
    }
    
    return recommendPeople 
  }
}