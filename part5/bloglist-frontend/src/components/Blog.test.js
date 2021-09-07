import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog list tests, steps 1-3', () => {
  let blog
  let user

  beforeEach(() => {
    blog = {
      title: 'This is title',
      author: 'Albert Einstein',
      url: 'someurl',
      likes: 100,
      user: {
        username: 'unknown',
        name: 'nameless'
      }
    }
    user = { username: 'unknown' }

  })

  test('Blog renders author and title, but does not render its url or number of likes by default.', () => {
    const component = render(
      <Blog blog={blog} user={user} />
    )
    const div = component.container.querySelector('.defaultBlog')
    expect(div).toHaveTextContent(
      'This is title Albert Einstein'
    )
    expect(div).not.toHaveStyle('display: none')
    const div2 = component.container.querySelector('.allBlog')
    expect(div2).toHaveStyle('display: none')
  })

  test('blogs url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const component = render(
      <Blog blog={blog} user={user} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.defaultBlog')
    expect(div).toHaveStyle('display: none')
    const div2 = component.container.querySelector('.allBlog')
    expect(div2).not.toHaveStyle('display: none')
    expect(div2).toHaveTextContent('someurl')
    expect(div2).toHaveTextContent('likes 100')
  })

  test('clicking the like button two times calls event handler twice', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} updateLikes={mockHandler} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})