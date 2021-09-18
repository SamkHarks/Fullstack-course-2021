import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('Blog list tests, step 4', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()
    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'some author' }
    })

    fireEvent.change(title, {
      target: { value: 'some title' }
    })
    fireEvent.change(url, {
      target: { value: 'some url' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('some author')
    expect(createBlog.mock.calls[0][0].title).toBe('some title')
    expect(createBlog.mock.calls[0][0].url).toBe('some url')
  })
})