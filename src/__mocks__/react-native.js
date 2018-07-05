import PropTypes from 'prop-types'

export const Image = {
  propTypes: {
    source: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        uri: PropTypes.string
      })
    ])
  }
}
