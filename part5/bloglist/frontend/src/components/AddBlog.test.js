import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlog from './AddBlog'
import userEvent from '@testing-library/user-event'

test('<AddBlog /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<AddBlog createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('save')
  await user.type(inputs[0], 'testing a form author...')
  await user.type(inputs[1], 'testing a form title...')
  await user.type(inputs[2], 'testing a form url...')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form author...')
})
