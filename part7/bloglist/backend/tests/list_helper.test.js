const testHelper = require('./test_helper')

const blogs = testHelper.initialBlogs

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = testHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('equals the blog with highest value of likes', () => {
    const result = testHelper.favouriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('author with most blogs', () => {
  test('should return the author with most blogs written and number of blogs', () => {
    const result = testHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      count: 3,
    })
  })
})

describe('author whose blogs have the most likes', () => {
  test('should return the author with most likes and the amount of likes they got', () => {
    const result = testHelper.nowLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})

test('dummy returns one', () => {
  const blogs = []

  const result = testHelper.dummy(blogs)
  expect(result).toBe(1)
})
