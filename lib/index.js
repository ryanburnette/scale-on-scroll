import merge from 'lodash/merge'
import throttle from 'lodash/throttle'
import windowScrollPosition from 'window-scroll-position'

var defaults = {
  multiplier: 0.25,
  startOffset: 0,
  scaleMax: 1,
  scaleMin: 0.25,
  factor: 1,
  context: window,
  throttleTimeout: 0,
  afterDestroy: function () {}
}

var options = {}

function setOptions(_options) {
  options = merge(defaults,_options)
  if ( options.startOffsetElement ) {
    window.addEventListener('load',e => {
      options.startOffset = document.querySelector(options.startOffsetElement).offsetTop
    })
  }
}

function setSelectorToString(selector) {
  options.element = selector
}

function setSelectorToElement() {
  options.element = document.querySelector(options.element)
}

function calculateFactor() {
  options.factor = 1 - Math.round(( ( windowScrollPosition(options.context).top - options.startOffset ) * options.multiplier ),2) / 100
}

function limitFactorMax() {
  if ( !options.scaleMax ) {
    return false
  }
  options.factor = options.factor >= options.scaleMax ? options.scaleMax : options.factor
}

function limitFactorMin() {
  if ( !options.scaleMin ) {
    return false
  }
  options.factor = options.factor < options.scaleMin ? options.scaleMin : options.factor
}

function setTransformValue() {
  options.transformValue = 'scale('+options.factor+')'
}

function setStyle() {
  options.element.style.WebkitTransform = options.transformValue;
  options.element.style.MozTransform = options.transformValue;
  options.element.style.OTransform = options.transformValue;
  options.element.style.transform = options.transformValue;
}

function scale() {
  calculateFactor()
  limitFactorMax()
  limitFactorMin()
  setTransformValue()
  setStyle()
}

function getThrottledScale() {
  if ( options.throttleTimeout > 0 ) {
    return throttle(scale,options.throttleTimeout)
  }
  return scale
}

function setBinds() {
  window.addEventListener('load', function() {
    setSelectorToElement()
    scale()
    window.addEventListener('scroll',getThrottledScale())
  })
}

function setDestroy() {
  options.destroy = function () {
    window.removeEventListener('scroll',throttledScale)
    options.element.style.WebkitTransform = null
    options.element.style.MozTransform = null
    options.element.style.OTransform = null
    options.element.style.transform = null
    options.afterDestroy()
    options = null
  }
}

export default function scaleOnScroll(selector,_options) {
  setOptions(_options)
  setSelectorToString(selector)
  setBinds()
  setDestroy()
  return options
}
