import React from 'react'
import QRCode from '../index'
import renderer from 'react-test-renderer'

describe('QRCode', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <QRCode />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with logo correctly', () => {
    const tree = renderer.create(
      <QRCode
        logo={{ uri: 'fakeUri' }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
