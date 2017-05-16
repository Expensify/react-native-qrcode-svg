import React, { PropTypes } from 'react'

export const View = ({ children }) => {
  return (
    <div>{children}</div>
  )
}

export const Image = ({ source, resizeMode }) => {
  return (
    <div>
      <span>Source: {source.uri ? source.uri : source}</span>
      <span>ResizeMode: {resizeMode}</span>
    </div>
  )
}
Image.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      uri: PropTypes.string
    })
  ])
}
