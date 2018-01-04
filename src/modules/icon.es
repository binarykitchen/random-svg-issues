import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {getViewBox, getId} from './sprites'

// useful export for when wrapping this into a React icon. inspired by:
// https://github.com/kisenka/svg-sprite-loader/tree/master/examples/custom-runtime-generator
class Icon extends Component {
  render () {
    return (
      <svg viewBox={getViewBox(this.props.type)}>
        <use xlinkHref={'#' + getId(this.props.type)} />
      </svg>
    )
  }
}

Icon.propTypes = {
  type: PropTypes.string.isRequired
}

export default Icon
