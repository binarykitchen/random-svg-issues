import restoreSvg from 'restore.svg'

const SPRITES = {
  'restore': restoreSvg
}

export const hasSvg = (type) => SPRITES.hasOwnProperty(type)

export const getId = (type) => {
  if (SPRITES[type]) {
    return SPRITES[type].id
  } else {
    console.warn('Unable to get ID of non-existing sprite type', type)
    return false
  }
}

export const getViewBox = (type) => {
  if (SPRITES[type]) {
    return SPRITES[type].viewBox
  } else {
    console.warn('Unable to get view box of non-existing sprite type', type)
    return false
  }
}

// see https://github.com/kisenka/svg-sprite-loader#runtime-configuration
export const toHtml = (type) =>
  `<svg viewBox="${getViewBox(type)}">
    <use xlink:href="#${getId(type)}"/>
  </svg>`
