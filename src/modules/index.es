import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap'

import Icon from './icon'

ReactDOM.render(
  <Button
    bsStyle='primary'
    className='icon-restore'
  >
    <Icon type='restore' />
    Where the heck is the svg icon??
  </Button>,
  document.getElementById('app')
)
