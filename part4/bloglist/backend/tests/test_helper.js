// eslint-disable-next-line no-unused-vars
var _ = require('lodash');
const Blog = require('../models/blog');
const User = require('../models/user')
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDB = async () => {

  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {

  return blogs.reduce((total, blog) => {
    return total + blog.likes;
  }, 0);
}

const favouriteBlog = (blogs) => {

  return blogs.reduce((max, blog) => {
    if(blog.likes > max.likes){
      return blog
    }
    return max
  }, {likes: 0})
}

const mostBlogs = (blogs) => {

  let authorCount = _.countBy(blogs, 'author');

  return _.reduce(authorCount, (result, count, author) => {
    if(count > result.count)
    {
      return { author: author, count: count };
    }
    return result;

  }, { author: null, count: 0 });
}

const nowLikes = (blogs) => {

  let authorCounts = {};

  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author;
    let likes = blogs[i].likes;

    if (authorCounts[author]) {
      authorCounts[author] += likes;
    } else {
      authorCounts[author] = likes;
    }
  }
  if (Object.keys(authorCounts).length === 0) {
    return null;
  }

  let mostLikes = Object.keys(authorCounts).reduce((maxAuthor, author) => {
    if (authorCounts[author] > authorCounts[maxAuthor]) {
      return author;
    }
    return maxAuthor;
  }, Object.keys(authorCounts)[0]);

  return { author: mostLikes, likes: authorCounts[mostLikes] };

//Lodash implementation:
// let authorCounts = {};

// _.forEach(blogs, function(blog) {
//   let author = blog.author;
//   let likes = blog.likes;

//   authorCounts[author] = _.get(authorCounts, author, 0) + likes;
// });
// console.log(authorCounts);

// if (_.isEmpty(authorCounts)) {
//   return null;
// }

// let mostLikes = _.reduce(Object.keys(authorCounts), (result, author) => {
//   if (authorCounts[author] > authorCounts[result]) {
//     return author;
//   }
//   return result;
// }, _.first(Object.keys(authorCounts)));
 
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  nowLikes,
  initialBlogs,
  blogsInDB,
  usersInDb
}