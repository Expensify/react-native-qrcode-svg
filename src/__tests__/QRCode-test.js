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

  // Let's simulate too big data passed to QRCode and check if onError Callback
  // Called properly
  it('calls onError in case of issue with code generating', () => {
    const onErrorMock = jest.fn()
    // Let's try to render with too big amount of data that should
    // throw an exception
    renderer.create(
      <QRCode
        value={(new Array(1000000)).join('123')}
        onError={onErrorMock}
      />
    )
    expect(onErrorMock.mock.calls.length).toBe(1)
  })

  it('does not call onError in case if value is fine', () => {
    const onErrorMock = jest.fn()
    renderer.create(
      <QRCode
        value='123'
        onError={onErrorMock}
      />
    )
    expect(onErrorMock.mock.calls.length).toBe(0)
  })

  it('renders with segmented value', () => {
    const onErrorMock = jest.fn()
    const segs = [
      { data: "ABCDEFG", mode: "alphanumeric" },
      { data: "0123456", mode: "numeric" },
    ];
    const tree = renderer.create(
      <QRCode
        value={segs}
        onError={onErrorMock}
      />
    ).toJSON()
    expect(onErrorMock.mock.calls.length).toBe(0)
    expect(tree).toMatchSnapshot()
  })
})
