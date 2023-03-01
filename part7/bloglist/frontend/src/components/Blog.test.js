import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = {
    title: 'Blog for testing, title',
    author: 'jest',
    url: 'testURL.blog.test.js',
    likes: 5,
    user: { username: 'JESTUser' },
  }
  const mockHandler = jest.fn()

  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} likeBlog={mockHandler} />).container
  })

  test('renders blog title', async () => {
    const title = await screen.getByText(/Blog for testing, title/i)
    expect(title).toHaveTextContent('Blog for testing, title')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.blogDetails')
    expect(div).not.toBeInTheDocument()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.blogDetails')
    expect(div).toHaveTextContent('jest')
    expect(div).toHaveTextContent('testURL.blog.test.js')
    expect(div).toHaveTextContent('5')
  })

  test('calls function twice when button is clicked twice', async () => {
    const user = userEvent.setup()
    const showDetails = screen.getByText('show')
    //clicks show details button
    await user.click(showDetails)

    const like = screen.getByText('like')
    //clicks like button twice
    await user.click(like)
    await user.click(like)
    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})

// test ('does not render details', () => {

//   const blog = {
//     title: 'Blog for testing, title',
//     author: 'jest',
//     url: 'testURL.blog.test.js',
//     likes: 5,
//     addedBy: 'user adding the blog'
//   }

//   render(<Blog blog={blog}/>)
//   const hidden = screen.queryByText(/testURL.blog.test.js/i)
//   expect(hidden).not.toBeInTheDocument()
// })
