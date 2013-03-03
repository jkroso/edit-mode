
var events = require('event')
  , makeEvent = require('dom-event')

/*!
 * state
 */

var prev
var el
var original

/**
 * Put `el` into edit mode
 * 
 * @param {DomElement} el
 */

module.exports = function(_el){
  if (_el === el) return
  el && el.blur()
  el = _el
  el.setAttribute('contenteditable', true)
  original = el.value = el.innerText
  el.focus()

  events.bind(el, 'blur', onBlur)
  events.bind(el, 'keyup', onKey)
}

/**
 * publish an `edit` event
 */

function onKey(e){
  var before = el.value
  var after = el.innerText
  if (before != after){
    el.value = after
    var event = makeEvent('edit')
    if (prev) event.prev = prev
    prev = event
    event.before = before
    event.after = after
    el.dispatchEvent(event)
  }
}

/**
 * Teardown
 */

function onBlur(e){
  var content = el.innerText
  
  // publish change
  if (content != original){
    var event = makeEvent('change')
    event.before = original
    event.after = content
    el.dispatchEvent(event)
  }

  el.removeAttribute('contenteditable')
  events.unbind(el, 'blur', onBlur)
  events.unbind(el, 'keyup', onKey)
  prev = el = false
}
