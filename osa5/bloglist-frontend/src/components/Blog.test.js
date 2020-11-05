import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let component2
  const blog = {
    title: 'komponentin testaaminen - tämä on title-teksti',
    author: 'Testaaja',
    url:'testaajien/tukikohta',
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renderöi aluksi vain blogin titlen ja authorin', () => {
    expect(component.container).toHaveTextContent(
      'komponentin testaaminen - tämä on title-teksti'
    )
    expect(component.container).toHaveTextContent(
      'Testaaja'
    )
    const div = component.container.querySelector('.bloginPiilotettavat')
    expect(div).toHaveStyle('display: none')
  })

  test('renderöi url:n ja liket esiin kun view-nappia painetaan', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.bloginPiilotettavat')
    expect(div).not.toHaveStyle('display: none')
  })

  //ei mene läpi ennen kuin toiminnallisuus lisätty
  test('kun like-nappia painetaan kahdesti, props-handleria kutsutaan kahdesti', () => {
    const button1 = component.getByText('view')
    fireEvent.click(button1)
    const mockHandler = jest.fn()
    component2 = render(
      <Blog blog={blog} like={mockHandler} />
    )
    const button2 = component2.container.querySelector('.like')
    fireEvent.click(button2)
    fireEvent.click(button2)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})