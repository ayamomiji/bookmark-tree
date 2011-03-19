jQuery ($) ->
  $('[data-i18n-key]').each (idx, elem) ->
    elem = $(elem)
    key = elem.attr('data-i18n-key')
    method = elem.attr('data-i18n-method') || 'text'
    translated = chrome.i18n.getMessage(key)
    elem[method](translated || "translation missing: #{key}")

  window.options =
    width: parseInt(localStorage.width) || 300
    height: parseInt(localStorage.height) || 400
    rootDirectory: localStorage.rootDirectory || '0'

  window.delay = (callback) -> setTimeout(callback, 10)
