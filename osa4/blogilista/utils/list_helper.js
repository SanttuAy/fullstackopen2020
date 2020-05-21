
const dummy = (blogs) => {
    return 1
  }
 
const totalLikes = (blogs) => {
    if(blogs.length === 1) return blogs[0].likes
    if(blogs.length === 0) return 0
    return blogs.reduce(function (sum, blog){
        console.log("hello", sum, blog)
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 1) return blogs[0]
    if(blogs.length === 0) return undefined
//    var suurin = blogs[0]
  //  var onSuurempi = blogs.filter(function(blogi) {
  //      return blogi.likes > = suurin.likes //esimerkkikoodissa luki tällä kohtaa 'koirat'?
    return blogs.reduce(function(edellinen, kohdalla) {
    return (edellinen.likes > kohdalla.likes) ? edellinen : kohdalla
    })    
    }


  module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog,
  }

  
