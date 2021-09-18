const lodash = require('lodash/collection')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, obj) => {
        return sum + obj.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const favBlog = blogs.reduce((fav, cur) =>{
        return (fav.likes < cur.likes) ? cur : fav 
    }, {likes:-1})

    delete favBlog._id
    delete favBlog.__v
    delete favBlog.url

    return favBlog.title ? favBlog : {} 
}

const mostBlogs = (blogs) => {
    const ret = lodash.groupBy(blogs, x => x.author)
    let author = null
    let nofBlogs = 0
    for (const key in ret) {
        if (ret[key].length > nofBlogs) {
            nofBlogs = ret[key].length
            author = key
        }
    }
    return author ? { author: author, blogs: nofBlogs } : {}
}

const mostLikes = (blogs) => {
    const ret = lodash.groupBy(blogs, x => x.author)
    let author = null
    let maxLikes = 0
    lodash.forEach(ret, (value, key) => {
        //console.log('author: ', key,'likes :', totalLikes(value))
        const likes = totalLikes(value)
        if (likes > maxLikes) {
            author = key
            maxLikes = likes
        }
    })
    return author ? { author: author, likes: maxLikes } : {}
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}